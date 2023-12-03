const sql = require("./db");
const { formatFilters } = require("../utils/query.utils");
// Constructor
const Admin = function (admin) {
  this.id = admin.id;
  this.courses_access = admin.courses_access || 0;
  this.tutors_access = admin.tutors_access || 0;
  this.students_access = admin.students_access || 0;
};

// Find 1 admin (mainly use to check if user is admin)
Admin.findOne = function (filters, callback) {
  const { filterKeys, filterValues } = formatFilters(filters);
  sql.query(
    `SELECT * FROM admins WHERE ${filterKeys}`,
    filterValues,
    (err, res) => {
      if (err) {
        console.log(err);
        callback(err, null);
        return;
      }

      if (res.length) {
        console.log("Find admin: ", { filters: filters, results: res[0] });
        callback(null, res[0]);
        return;
      }

      console.log("Find no admin: ", { filters: filters });
      callback(null, null);
    },
  );
};

module.exports = Admin;
