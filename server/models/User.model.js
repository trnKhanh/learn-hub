const sql = require("./db");

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

    console.log("Created users: ", { newUser: newUser, users: res });
    callback(null, { id: res.insertId, ...newUser });
  });
}

// Find one user by filter 
User.findOne = function(filter, callback) {
  sql.query(`SELECT * from users WHERE ?`, filter, (err, res) => {
    if (err) {
      console.log(err); callback(err, null);
      return;
    }
    if (res.length) {
      console.log("Found user: ", { filter: filter, users: res[0] });
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

    console.log("Found users: ", { filter: filter, users: res });
    callback(null, res);
  });
}

// Update user by id
User.updateById = function(id, fields, callback) {
  sql.query(`UPDATE users SET ? WHERE id=?`, [ fields, id ], (err, res) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }

    console.log("Updated users", {fields: fields, users: res});
    callback(null, res);
  });
}

module.exports = User;
