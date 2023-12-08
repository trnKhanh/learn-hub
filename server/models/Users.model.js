const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");
const { randomUUID } = require("crypto");

// User constructor
class User {
  constructor(user) {
    this.email = user.email || null;
    this.username = user.username || null;
    this.password = user.password || null;
    this.full_name = user.full_name || null;
    this.date_of_birth = user.day_of_birth || null;
    this.phone_number = user.phone_number || null;
    this.institute = user.institution || null;
    this.area_of_study = user.area_of_study || null;
    this.biography = user.biography || null;
  }
  static queryFields = `id, email, username, full_name, date_of_birth, phone_number, institute, area_of_study, biography`;

  // Create new User
  static create = async (newUser) => {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();

      const [res, _] = await con.query(`INSERT INTO users SET ?`, newUser);
      const [rows, fields] = await con.query(
        `SELECT ${User.queryFields} 
         FROM users 
         WHERE id=?`,
        [res.insertId],
      );

      await con.commit();
      sql.releaseConnection(con);

      console.log("Created user: ", { newUser: rows[0], results: res });
      return rows[0];
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  // Find one user by filter
  static findOne = async (filters, include_password = 0) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${User.queryFields} ${include_password ? " ,password" : ""} 
       FROM users 
       WHERE ${filterKeys}`,
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
  static findAll = async (filters, include_password = 0) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${User.queryFields} ${include_password ? " ,password" : ""}
       FROM users 
       WHERE ${filterKeys}`,
      filterValues,
    );
    console.log("Found users: ", { filters: filters, results: rows });
    return rows;
  };

  static getAll = async () => {
    const [rows, fields] = await sql.query(
      `SELECT ${User.queryFields} FROM users`,
    );
    console.log("Get all users: ", { results: rows });
    return rows;
  };

  // Update user by filters
  static updateById = async (id, columns) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [res, _] = await con.query(`UPDATE users SET ? WHERE id=?`, [
        columns,
        id,
      ]);
      const [rows, fields] = await con.query(
        `SELECT ${User.queryFields} FROM users WHERE id=?`,
        [id],
      );

      console.log("Updated users by id", {
        id: id,
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
  static deleteById = async (id) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [rows, fields] = await con.query(
        `SELECT ${User.queryFields} FROM users WHERE id=?`,
        [id],
      );

      const [res, _] = await con.query(`DELETE FROM users WHERE id=?`, [id]);

      console.log("Deleted users by id", {
        id: id,
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
}
module.exports = User;
