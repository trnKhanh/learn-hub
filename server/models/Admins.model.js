const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");
const User = require("../models/Users.model");
// Constructor
class Admin {
  constructor(admin) {
    this.id = admin.id || null;
    this.courses_access = admin.courses_access || 0;
    this.tutors_access = admin.tutors_access || 0;
    this.students_access = admin.students_access || 0;
  }

  static queryFields = `${User.queryFields}, courses_access, tutors_access, students_access, supporters_access`;

  // Create new Admin
  static create = async (newAdmin) => {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();

      const [res, _] = await con.query(`INSERT INTO admins SET ?`, newAdmin);
      const [rows, fields] = await con.query(
          `SELECT ${Admin.queryFields} 
          FROM admins NATURAL JOIN users 
          WHERE id=?`,
          [newAdmin.id],
      );

      await con.commit();
      sql.releaseConnection(con);

      console.log("Created admins: ", { newAdmin: rows[0], results: res });
      return rows[0];
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  // Find one admin by filter
  static findOne = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
        `SELECT ${Admin.queryFields} 
        FROM admins NATURAL JOIN users 
        WHERE ${filterKeys}`,
        filterValues,
    );
    if (rows.length) {
      console.log("Found admin: ", { filters: filters, results: rows[0] });
      return rows[0];
    } else {
      console.log("Found no admin: ", { filters: filters });
      return null;
    }
  };

  // Find all admins by filter
  static findAll = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
        `SELECT ${Admin.queryFields} 
        FROM admins NATURAL JOIN users  
        WHERE ${filterKeys}`,
        filterValues,
    );
    console.log("Found admins: ", { filters: filters, results: rows });
    return rows;
  };

  static getAll = async () => {
    const [rows, fields] = await sql.query(
        `SELECT ${Admin.queryFields} 
        FROM admins NATURAL JOIN users`,
    );
    console.log("Get all admins: ", { results: rows });
    return rows;
  };

  // Update admin by filters
  static updateById = async (id, columns) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [res, _] = await con.query(
        `UPDATE admins SET ?
        WHERE id=?`,
        [columns, id],
      );
      const [rows, fields] = await con.query(
          `SELECT ${Admin.queryFields} 
          FROM admins NATURAL JOIN users
          WHERE id=?`,
          [id],
      );

      console.log("Updated admins by Id", {
        id: id,
        columns: columns,
        results: res,
      });

      con.commit();
      sql.releaseConnection(con);
      if (res.affectedRows == 0) return null;
      else return rows;
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  // Delete admin by filters
  static deleteById = async (id) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [rows, fields] = await con.query(
          `SELECT ${Admin.queryFields} 
          FROM admins NATURAL JOIN users
          WHERE id=?`,
          [id],
      );

      const [res, _] = await con.query(
        `DELETE FROM admins
        WHERE id=?`,
        [id],
      );

      console.log("Deleted admins by id", {
        id: id,
        results: res,
      });

      con.commit();
      sql.releaseConnection(con);

      if (res.affectedRows == 0) return null;
      else return rows;
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };
}
module.exports = Admin;
