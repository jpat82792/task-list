const pgp = require('pg-promise')();
const dbConfig = require('../constants/db-config.js');
const getCategoriesQuery = "SELECT * from categories where user_id=$(userId)";
const setCategoryQuery = "INSERT INTO categories(user_id, category) VALUES ($(userId),"
 +"$(category))";
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
	return db.query(setCategoryQuery, category);
}

let apiSetCategory =  (req, res, next)=>{
	console.log("apiSetCategory");
	if(req.headers.user !== undefined){
		const user = JSON.parse(req.headers.user);
		const category = req.body.data.category;
		if(category.categoryId === -1){
			setCategory(user.user_id, category.category).then(
				(results) =>{
				res.status(200).json({success:true, category:result[0]});
			})
			.catch((err)=>{
				res.status(400).json({success:false});
			});
		}
		else{
			//TODO ADD PATCH
		}
	}
}

module.exports = {apiGetCategories:apiGetCategories, apiSetCategory:apiSetCategory}