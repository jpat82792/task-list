const pgp= require('pg-promise')();
const dbConfig = require('../constants/db-config.js');
const getNotesQuery = "SELECT * FROM notes where user_id=$(userId)";
const setNoteQuery = "INSERT INTO notes(user_id, title, body) VALUES ($(userId),$(title),$(body)) RETURNING note_id;"
const updateNoteQuery = "UPDATE notes set body=$(body), title=$(title) WHERE "+
 "user_id=$(userId) AND note_id=$(note_id)";
const categoryController = require('./category-controller.js');
 const deleteNoteQuery = " DELETE FROM notes where NOTE_ID=$(noteId) and "+
  " user_id=$(userId) ";

const db = require('./database-controller.js').db;

var getNotes = async function(userId, note){
	console.log("getNotes()");
	console.log(userId);
	let result = db.query(getNotesQuery,{userId: userId});
	return await result;
}

var apiGetNotes = async function(req, res, next){
	console.log("apiGetNotes()");
	let user = JSON.parse(req.headers.user);
	console.log(user);
	let result = await getNotes(user.user_id);
	for(let i = 0; i < result.length; i++){
		let note = result[i];
		let categoryIds = await categoryController.getCategoryIdsByNote(
			note, user.user_id);
		note.categories = await categoryController.getCategoriesByIds(categoryIds);		
	}
	res.status(200).json(result);
}

let setNotesQueryBuilder = async (userId, noteId, categories) =>{
	console.log('setNotesQueryBuilder');
	let noteCategoryColumnSet = new pgp.helpers
	.ColumnSet(['user_id', 'note_id', 'category_id'],{table:'notes_categories'});
	let okay =await categoryController.clearNoteCategories(noteId, userId);
	let categoryIds = [];
	categories.forEach(category =>{
		categoryIds.push(category.category_id);
	});
	let values = generateNoteCategoryValues(userId, noteId, categoryIds);
	let query = pgp.helpers.insert(values, noteCategoryColumnSet);
	return db.query(query);

}	
let generateNoteCategoryValues = (userId, noteId, categories) =>{
	let values = [];
	console.log('generateNoteCategoryValues');
	categories.forEach((value)=>{
		values.push({user_id:userId, note_id:noteId, category_id: value});
	});
	return values;
}

var setNote =  function(user, note, res){
	console.log("setNote()");
	let result;
	console.log(note);
	const values = {userId: user.user_id, title: note.title, 
		body: note.body};
	//var result = db.query(setNoteQuery, values);
	db.tx( t =>{
		let noteId = t.one(setNoteQuery, values);
		let categories = categoryController.getMultipleCategories(t, user.user_id,
		 note.categories);
		return t.batch([noteId, categories]);
	})
	.then(data =>{
		setNotesQueryBuilder(user.user_id, data[0].note_id, data[1]);
		res.status(200).json({success:true, result:data[0].note_id});		
	})
	.catch(error=>{
		console.log(error);
		res.status(400).json({success:false});
	})
	
}

var apiSetNote = function(req, res, next){
	console.log("apiSetNote()");
	if(req.headers.user !== undefined)
	{
		const user = JSON.parse(req.headers.user);
		console.log(user.user_id);
		const note = req.body.data.note;
		if(note.id === -1){
			setNote(user, note,res);
		}
		else{
			updateNote(user, note, res);
		}
	}
	else{
		console.log("no auth");
		res.status(401).json({success:false});
	}
}

var apiUpdateNote = function(req, res, next){
	console.log("apiUpdateNote");
	var note_id = req.params.id;
	const user = JSON.parse(req.headers.user);
	console.log(note_id);
	const note = req.body.data.note;
	updateNote(user, note,res);
}
//TODO:Update note content 
//TODO:clear removed categories
//TODO:add new categories
var updateNote = function(user, note, res){
	console.log("updateNote()");
	console.log(note);
	const values = {userId: user.user_id, title: note.title, 
		body: note.body, note_id: note.id};
		db.tx( t =>{
			let update = db.query(updateNoteQuery, values);
			let categories = categoryController
				.getMultipleCategories(t,user.user_id,note.categories);
			return t.batch([update, categories]);
		})
		.then(data =>{
			console.log("updateNoteComplete");
			console.log(data);
			let queryResult = setNotesQueryBuilder(user.user_id, note.id, data[1]);
			if(queryResult !== null){
				res.status(200).json({success:true, result:data[0].note_id});				
			}
		})
		.catch(err =>{
			console.log(err);
		});
	
}
//getCategoriesToRemove
let updateNoteCategories = () =>{
	let categories = categoryController.getMultipleCategories(t, user.user_id,
 	note.categories);
}

var apiDeleteNote = function(req, res, next){
	console.log("apiDeleteNote()");
	const noteId = req.params.id;
	const userId = JSON.parse(req.headers.user);
	deleteNote(noteId, userId.user_id).then((result)=>{
		res.status(200).json({success: true});
	})
	.catch((err)=>{
		console.log(err);
		res.status(400).json({sucess: false});
	});
}

var deleteNote = async function(noteId, userId){
	const params = {noteId: noteId, userId: userId};
	let result = db.query(deleteNoteQuery, params);
	return result;
}
module.exports = {apiSetNote:apiSetNote, apiUpdateNote: apiUpdateNote,
	apiGetNotes:apiGetNotes, apiDeleteNote: apiDeleteNote};