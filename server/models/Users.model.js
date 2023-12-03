const sql = require("./db");
const { formatFilters } = require("../utils/query.utils");

// User constructor
const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.full_name = user.full_name;
  this.day_of_birth = user.day_of_birth;
  this.phone_number = user.phone_number;
  this.institution = user.institution;
  this.area_of_study = user.area_of_study;
  this.biography = user.biography;
};

// Create new User
User.create = function (newUser, callback) {
  sql.query(`INSERT INTO users SET ?`, newUser, (err, res) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      console.log("Created user: ", { newUser: newUser, results: res });
      callback(null, { id: res.insertId, ...newUser });
    }
  });
};

// Find one user by filter
User.findOne = function (filters, callback) {
  const { filterKeys, filterValues } = formatFilters(filters);
  sql.query(
    `SELECT * FROM users WHERE ${filterKeys}`,
    filterValues,
    (err, res) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        if (res.length) {
          console.log("Found user: ", { filters: filters, results: res[0] });
          callback(null, res[0]);
        } else {
          console.log("Found no user: ", { filters: filters });
          callback(null, null);
        }
      }
    },
  );
};

// Find all users by filter
User.findAll = function (filters, callback) {
  const { filterKeys, filterValues } = formatFilters(filters);
  sql.query(
    `SELECT * FROM users WHERE ${filterKeys}`,
    filterValues,
    (err, res) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        console.log("Found users: ", { filters: filters, results: res });
        callback(null, res);
      }
    },
  );
};

// Update user by id
User.update = function (filters, columns, callback) {
  const { filterKeys, filterValues } = formatFilters(filters);
  sql.query(
    `UPDATE courses SET ? WHERE ${filterKeys}`,
    [columns, filterValues],
    (err, res) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        console.log("Updated users", {
          filters: filters,
          columns: columns,
          results: res,
        });
        callback(null, res);
      }
    },
  );
};

module.exports = User;
