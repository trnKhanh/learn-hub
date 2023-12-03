const mysql = require("mysql");
const dbConfig = require("../config/db.config");
const fs = require("fs");
const path = require("path");

let pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: true,
});

// Running queries to initialize databas
const init_query = fs
  .readFileSync(path.join(__dirname, "./queries/init.sql"))
  .toString();
pool.query(init_query, (err, res) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Initialize database");
});

module.exports = pool;
