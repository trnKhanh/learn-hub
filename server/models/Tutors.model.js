const sql = require("./db");
const { formatFilters } = require("../utils/query.utils");

const Tutor = function (tutor) {
  this.id = tutor.id;
  this.admin_id = tutor.admin_id;
  this.verified = tutor.verified || 0;
};

Tutor.create = function (newTutor, callback) {
  sql.query("INSERT INTO tutors SET ?", [newTutor], (err, res) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      console.log("Created tutor: ", { newTutor: newTutor, results: res });
      callback(null, res);
    }
  });
};

Tutor.findOne = function (filters, callback) {
  const { filterKeys, filterValues } = formatFilters(filters);
  sql.query(
    `SELECT * FROM tutors WHERE ${filterKeys}`,
    filterValues,
    (err, res) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        if (res.length) {
          console.log("Found tutor: ", { filters: filters, results: res[0] });
          callback(null, res[0]);
        } else {
          console.log("Found no tutor: ", { filters: filters });
          callback(null, null);
        }
      }
    },
  );
};

module.exports = Tutor;
