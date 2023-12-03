const sql = require("./db");
const { formatFilters } = require("../utils/query.utils");

// Constructor
const Course = function (course) {
  this.name = course.name;
  this.description = course.description;
  this.difficulty = course.difficulty;
  this.duration = course.duration;
  this.owner = course.owner;
  this.price = course.price;
  this.discounted = course.discounted;
};

// Create new Course
Course.create = function (newCourse, callback) {
  sql.query("INSERT INTO courses SET ?", newCourse, (err, res) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      console.log("Created course: ", { newCourse: newCourse, results: res });
      callback(null, res);
    }
  });
};

// Find one course
Course.findOne = function (filters, callback) {
  const { filterKeys, filterValues } = formatFilters(filters);
  sql.query(
    `SELECT * FROM courses WHERE ${filterKeys}`,
    filterValues,
    (err, res) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        if (res.length) {
          console.log("Found course: ", { filters: filters, results: res[0] });
          callback(null, res[0]);
        } else {
          console.log("Found no course: ", { filters: filters });
          callback(null, null);
        }
      }
    },
  );
};

// Find all courses that match filter
Course.findAll = function (filters, callback) {
  const { filterKeys, filterValues } = formatFilters(filters);
  sql.query(
    `SELECT * FROM courses WHERE ${filterKeys}`,
    filterValues,
    (err, res) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        console.log("Found courses: ", { filters: filters, results: res });
        callback(null, res);
      }
    },
  );
};

// Update course by id
Course.update = function (filters, columns, callback) {
  const { filterKeys, filterValues } = formatFilters(filters);
  sql.query(
    `UPDATE courses SET ? WHERE ${filterKeys}`,
    [columns, filterValues],
    (err, res) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        console.log("Updated courses: ", {
          filters: filters,
          columns: columns,
          results: res,
        });
        callback(null, res);
      }
    },
  );
};

module.exports = Course;
