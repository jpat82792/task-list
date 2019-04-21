const pgp = require('pg-promise')();
const dbConfig = require('../constants/db-config.js');
const getCategoriesQuery = "SELECT * from categories where user_id=$(userId)";
const setCategoryQuery = "INSERT INTO categories(user_id, category) VALUES ($(userId),"
 +"$(category)) RETURNING category_id";
 const deleteCategoryQuery = "DELETE FROM categories where category_id=$(category_id) "
 +"AND user_id=$(userId)";
 const db = pgp(dbConfig.database);


let getCategories = async function(userId){
	console.log("getCategories()");
	return db.query(getCategoriesQuery, {userId:userId});
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

module.exports = {apiGetCategories:apiGetCategories, apiSetCategory:apiSetCategory}