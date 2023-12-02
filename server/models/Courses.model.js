const sql = require("./db");

// Constructor
const Course = function (course) {
  this.name = course.name;
  this.description = course.description;
  this.difficulty = course.difficulty;
  this.duration = course.duration;
  this.admin_id = course.admin_id;
  this.price = course.price;
  this.discounted = course.discounted;
};

// Create new Course
Course.create = function (newCourse, callback) {
  sql.query("INSERT INTO courses SET ?", newCourse, (err, res) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }

    console.log("Created course", { newCourse: newCourse, courses: res });
    callback(null, res);
  });
};

// Find one course
Course.findOne = function (filter, callback) {
  sql.query("SELECT * FROM courses WHERE ?", filter, (err, res) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }

    if (res.length) {
      console.log("Found course:", { filter: filter, courses: res[0] });
      callback(null, res[0]);
      return;
    }

    console.log("Found no course", { filter: filter });
    callback(null, null);
  });
};

// Find all courses that match filter
Course.find = function (filter, callback) {
  sql.query("SELECT * FROM courses WHERE ?", filter, (err, res) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }

    console.log("Found courses:", { filter: filter, courses: res });
    callback(null, res);
  });
};

// Update course by id
Course.updateById = function (id, fields, callback) {
  sql.query("UPDATE courses SET ? WHERE id=?", [fields, id], (err, res) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }

    console.log("Updated courses:", { id: id, fields: fields, courses: res });
    callback(null, res);
  });
};

module.exports = Course;
