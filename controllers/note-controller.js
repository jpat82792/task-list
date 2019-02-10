const pgp= require('pg-promise')();
const dbConfig = require('../constants/db-config.js');
const getNotesQuery = "SELECT * FROM notes where user_id=$(userId)";
const setNoteQuery = "INSERT INTO notes(user_id, title, type, body) VALUES ($(userId),$(title),$(type),$(body)) RETURNING note_id;"
const updateNoteQuery = "UPDATE notes set body=$(body), title=$(title) WHERE "+
 "user_id=$(userId) AND note_id=$(note_id)";

const db = pgp(dbConfig.database);

var getNotes = async function(userId){
	console.log("getNotes()");
	console.log(userId);
	var result = db.query(getNotesQuery,{userId: userId});
	return result;
}

var apiGetNotes = function(req, res, next){
	console.log("apiGetNotes()");
	let user = JSON.parse(req.headers.user);
	console.log(user);
	if(user !== undefined){
		getNotes(user.user_id).then((result)=>{
			res.status(200).json({notes: result});
		})
		.catch((err)=>{
			res.sendStatus(500);
		});
	}
	else{
		res.sendStatus(400);
	}
}

var setNote =  async function(user, note){
	console.log("setNote()");
	const values = {userId: user.user_id, title: note.title, type: note.category, body: note.body};
	var result = db.query(setNoteQuery, values);
	return result;
}

var apiSetNote = function(req, res, next){
	console.log("apiSetNote()");
	if(req.headers.user !== undefined)
	{
		const user = JSON.parse(req.headers.user);
		console.log(user.user_id);
		const note = req.body.data.note;
		if(note.id === -1){
			setNote(user, note).then((result)=>{
				res.status(200).json({success:true, result:result[0]});
			})
			.catch((err)=>{
				res.status(400).json({success:false});
			});
		}
		else{
			updateNote(user, note).then((result)=>{
				res.status(200).json({success:true});
			})
			.catch((err)=>{
				res.status(400).json({success:false});
			});
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
	updateNote(user, note).then((result)=>{
		res.status(201).json({success: true});
	})
	.catch((err)=>{
		res.status(400).json({success: false});
	});
}

var updateNote = async function(user, note){
	console.log("updateNote()");
	const values = {userId: user.user_id, title: note.title, 
		body: note.body, note_id: note.id};
		var result = db.query(updateNoteQuery, values);
		return result;
}

module.exports = {apiSetNote:apiSetNote, apiUpdateNote: apiUpdateNote,apiGetNotes:apiGetNotes};