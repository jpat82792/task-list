const pgp= require('pg-promise')();
const dbConfig = require('../constants/db-config.js');
const setNoteQuery = "INSERT INTO notes(user_id, title, category, body) VALUES ($(userId),$(title),$(category),$(body));"

var setNote =  async function(user, note){
	console.log("setNote()");
	const values = {userId: user.user_id, title: note.title, category: note.category, body: note.body};
	var result = db.query(setNoteQuery, values);
	return result;
}

var apiSetNote = function(req, res, next){
	console.log("apiSetNote()");
	const user = req.user;
	console.log(user);
	const note = req.body.data.note;
	setNote(user, note).then((result)=>{
		console.log("result");
		res.status(200).json({success:true});
	})
	.catch((err)=>{
		console.log(err);
		res.status(400).json({success:false});
	});
}

module.exports = {apiSetNote:apiSetNote};