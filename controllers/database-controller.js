const pgp= require('pg-promise')();
const dbConfig = require('../constants/db-config.js');
const db = pgp(dbConfig.database);
module.exports={
	db:db
}