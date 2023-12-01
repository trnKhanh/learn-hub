const sql = require("./db.js");

// Create users table
sql.query(`
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(72) NOT NULL
)`, (err, res) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Created \"users\" table");
});

// User constructor
const User = function(user) {
  this.username = user.username;
  this.password = user.password;
};

// Create new User
User.create = function(newUser, callback) {
  sql.query(`INSERT INTO users SET ?`, newUser, (err, res) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }

    console.log("Created users: ", { id: res.insertId, ...newUser });
    callback(null, { id: res.insertId, ...newUser });
  });
}

// Find one user by filter 
User.findOne = function(filter, callback) {
  sql.query(`SELECT * from users WHERE ?`, filter, (err, res) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }
    if (res.length) {
      console.log("Found user: ", { filter: filter, user: res[0]});
      callback(null, res[0]);
      return;
    }
    callback(null, null);
  });
}
// Find all users by filter
User.find = function(filter, callback) {
  sql.query(`SELECT * from users WHERE ?`, filter, (err, res) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }

    console.log("Found users: ", { filter: filter, user: res });
    callback(null, res);
  });
}



module.exports = User;
