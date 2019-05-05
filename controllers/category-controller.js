const pgp = require('pg-promise')();
const dbConfig = require('../constants/db-config.js');
const getCategoriesQuery = "SELECT * from categories where user_id=$(userId)";
const getCategoryIdsByNoteQuery = "SELECT category_id FROM notes_categories where user_id=$(userId) AND "
+ "note_id=$(noteId)"
const getCategoriesByIdsQuery = "select * from categories where category_id=$(category_id)";
const setCategoryQuery = "INSERT INTO categories(user_id, category) VALUES ($(userId),"
 +"$1 RETURNING category_id";
 const deleteCategoryQuery = "DELETE FROM categories where category_id=$(category_id) "
 +"AND user_id=$(userId)";
 const getMultipleCategoriesPrefix = "SELECT category_id FROM categories where user_id=$(userId)"
 +" AND ";
  const getMultipleCategoriesPrefixNoAnd = "SELECT category_id FROM categories where user_id=$(userId);";
 const insertNewCategories = "INSERT INTO TABLE notes_categories WHERE NOT EXISTS ("+
" SELECT * FROM notes_categories WHERE )"
 const db = pgp(dbConfig.database);
/*notes_categories*/
	let getCategoryIdsByNote = async (note, userId) =>{
		console.log('getCategoryIdsByNote()');
		return await db.query(getCategoryIdsByNoteQuery, {noteId:note.note_id,userId:userId})
	}
	let getCategoriesByIds = async (categories) =>{
		console.log('getCategoriesByIds()');
		let gotCategories = await categories;
		let categoryStrings = [];
		for(let i =0; i < gotCategories.length; i++){
			let category = gotCategories[i];
			categoryStrings.push(await db.query(getCategoriesByIdsQuery, category));
		}
		return await categoryStrings;
	}
/*categories*/
let getCategories = async function(userId){
	console.log("getCategories()");
	return db.query(getCategoriesQuery, {userId:userId});
}
let buildWhereClause = (categories)=>{
	let clause = '';
	if(categories.length !== 0){
		categories.forEach((value, index) =>{
			if(index === categories.length-1){
				clause += " category='"+value+"';";
			}
			else{
				clause += " category='"+value+"' OR ";
			}
		});	
	}
	else{
		clause = '';
	}

	return clause;
}

let getCategoriesToRemove = (userId, not) =>{
	let noteCategoryColumnSet = new pgp.helpers
	.ColumnSet(['user_id', 'note_id', 'category_id'],{table:'notes_categories'});
}

let getMultipleCategories = (t, userId, categories) =>{
			console.log('getMultipleCategories');
			console.log(categories);
			let getMultipleCategories;
			if(categories.length ===0){
				getMultipleCategories = getMultipleCategoriesPrefixNoAnd;
			}
			else{
				getMultipleCategories = getMultipleCategoriesPrefix + 
		  	buildWhereClause(categories);				
			}


		console.log(getMultipleCategories);
	return t.query(getMultipleCategories, {userId:userId});
}

let apiGetCategories = function(req, res, next){
	console.log("apiGetCategories()");
	let user = JSON.parse(req.headers.user);
	if(user !== undefined){
		getCategories(user.user_id).then((results)=>{
			console.log(results);
			res.status(200).json({categories: results});
		})
		.catch((err)=>{
			console.log(err);
			res.sendStatus(500);
		});
	}
	else{
		res.sendStatus(400);
	}
}

let setCategory = async function(userId, category){
	console.log("setCategory()");
	let insertCategory = {userId:userId, category:category}
	console.log(insertCategory);
	return db.query(setCategoryQuery, insertCategory);
}

let apiSetCategory =  (req, res, next)=>{
	console.log("apiSetCategory");
	if(req.headers.user !== undefined){
		const user = JSON.parse(req.headers.user);
		const category = req.body.data.category;
		console.log(category);
		if(category.categoryId === undefined){
			setCategory(user.user_id, category).then(
				(results) =>{
					console.log(results[0].category_id);
				let savedCategory = {user_id:user.user_id, category:category, category_id:results[0].category_id };
				res.status(200).json({success:true, category:savedCategory});
			})
			.catch((err)=>{
				console.log(err);
				res.status(400).json({success:false});
			});
		}
		else{
			console.log("patch");
			//TODO ADD PATCH
		}
	}
}

module.exports = {apiGetCategories:apiGetCategories, 
	apiSetCategory:apiSetCategory, 
	getCategories:getCategories,getMultipleCategories:getMultipleCategories,
getCategoryIdsByNote:getCategoryIdsByNote,
getCategoriesByIds:getCategoriesByIds}