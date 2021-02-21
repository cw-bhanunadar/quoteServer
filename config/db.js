const mysql = require("mysql");
const config = require("./config.js");

const connection = mysql.createConnection({
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  host: config.mysql.host,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
