const mysql = require("mysql");
const dbConfig = require("../config/db.config");
const fs = require("fs");
const path = require("path");

let connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected \"learnhub\" database")
})

const init_query = fs.readFileSync(path.join(__dirname, "./queries/init.sql")).toString();
connection.query(init_query, (err, res) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Initialize database");
});

module.exports = connection;
