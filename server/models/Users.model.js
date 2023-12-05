const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");
const { randomUUID } = require("crypto");

// User constructor
const User = function (user) {
  this.uuid = user.uuid || randomUUID();
  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
  this.full_name = user.full_name;
  this.date_of_birth = user.day_of_birth;
  this.phone_number = user.phone_number;
  this.institute = user.institution;
  this.area_of_study = user.area_of_study;
  this.biography = user.biography;
};

// Create new User
User.create = async (newUser) => {
  const con = await sql.getConnection();
  try {
    await con.beginTransaction();

    const [res, _] = await con.query(`INSERT INTO users SET ?`, newUser);
    const [rows, fields] = await con.query(
      `SELECT * FROM users WHERE id=?`,
      res.insertId,
    );

    console.log("Created user: ", { newUser: rows[0], results: res });

    await con.commit();
    sql.releaseConnection(con);

    return rows[0];
  } catch (err) {
    await con.rollback();
    sql.releaseConnection(con);

    throw err;
  }
};

// Find one user by filter
User.findOne = async (filters) => {
  const { filterKeys, filterValues } = formatFilters(filters);
  const [rows, fields] = await sql.query(
    `SELECT * FROM users WHERE ${filterKeys}`,
    filterValues,
  );
  if (rows.length) {
    console.log("Found user: ", { filters: filters, results: rows[0] });
    return rows[0];
  } else {
    console.log("Found no user: ", { filters: filters });
    return null;
  }
};

// Find all users by filter
User.findAll = async (filters) => {
  const { filterKeys, filterValues } = formatFilters(filters);
  const [rows, fields] = await sql.query(
    `SELECT * FROM users WHERE ${filterKeys}`,
    filterValues,
  );
  console.log("Found users: ", { filters: filters, results: rows });
  return rows;
};

// Update user by filters
User.update = async (filters, columns) => {
  const con = await sql.getConnection();

  try {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [res, _] = await con.query(
      `UPDATE users SET ? WHERE ${filterKeys}`,
      [columns, filterValues],
    );
    const [rows, fields] = await con.query(
      `SELECT * FROM users WHERE ${filterKeys}`,
      [filterValues],
    );

    console.log("Updated users", {
      filters: filters,
      columns: columns,
      results: rows,
    });

    con.commit();
    sql.releaseConnection(con);

    return rows;
  } catch (err) {
    await con.rollback();
    sql.releaseConnection(con);

    throw err;
  }
};

// Delete user by filters
User.delete = async (filters) => {
  const con = await sql.getConnection();

  try {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await con.query(
      `SELECT * FROM users WHERE ${filterKeys}`,
      [filterValues],
    );

    const [res, _] = await con.query(
      `DELETE FROM users WHERE ${filterKeys}`,
      [filterValues],
    );

    console.log("Updated users", {
      filters: filters,
      results: rows,
    });

    con.commit();
    sql.releaseConnection(con);

    return rows;
  } catch (err) {
    await con.rollback();
    sql.releaseConnection(con);

    throw err;
  }
};

module.exports = User;
