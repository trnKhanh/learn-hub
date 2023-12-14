const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config");
const fs = require("fs");
const path = require("path");

const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port    : dbConfig.PORT,
  multipleStatements: true,
});

// Running queries to initialize databas
const init_query = fs
  .readFileSync(path.join(__dirname, "./queries/init.sql"))
  .toString();

try {
  pool.query(init_query);
  console.log("Initialize database");
} catch (err) {
  console.log(err);
}

module.exports = pool;
