const sql = require("./db");

const Admin = function (admin) {
  this.id = id;
};

Admin.findOne = function (filter, callback) {
  sql.query("SELECT * FROM admins WHERE ?", filter, (err, res) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }

    if (res.length) {
      console.log("Find admin", { filter: filter, admins: res[0] });
      callback(null, res[0]);
      return;
    }

    console.log("Find no admin", { filter: filter });
    callback(null, null);
  });
};

module.exports = Admin;
