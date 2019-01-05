const pgp = require('pg-promise')();
const connString = 'postgres://task_list_admin:tlIsBest21@172.17.0.2:5432/task_list';

const db = pgp(connString);
const setUserQuery = "INSERT INTO users(username, email, password) VALUES($(username), $(email), crypt($(password), gen_salt('bf')) ) RETURNING username;"
const getUserQuery = "SELECT * from users where username = $(username) OR email=$(username) AND password = crypt($(password), gen_salt('bf'));";
const getUserByIdQuery = "SELECT * FROM users where user_id=$(id)";
const setUser = async function(username, email, password)
{
  console.log("setUser()");
  const values = {"username":username, "email":username, "password": password};
  var result = db.query(setUserQuery, values);
  return result;
};

const getUser = async function(username, email, password)
{
  console.log("getUser()");
  const parameters = {"username": username,  
    "password": password};
  var user = db.query(getUserQuery, parameters);
  return user;
}
const getUserById = async function(id)
{
  const parameters = {"id": id};
  return db.query(getUserByIdQuery,parameters);
}

module.exports = {"setUser":setUser, "getUser": getUser, 
"getUserById": getUserById};
