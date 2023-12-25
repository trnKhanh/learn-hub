const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");
const User = require("../models/Users.model");
// Constructor
class Student {
  constructor(student) {
    this.id = student.id;
    this.membership = student.membership;
  }

  static queryFields = `${User.queryFields}, membership`;

  // Create new student
  static create = async (newStudent) => {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();

      const [res, _] = await con.query(
        `INSERT INTO students SET ?`,
        newStudent,
      );
      const [rows, fields] = await con.query(
        `SELECT ${Student.queryFields} 
         FROM students NATURAL JOIN users 
         WHERE id=?`,
        [newStudent.id],
      );

      await con.commit();
      sql.releaseConnection(con);

      console.log("Created students: ", {
        newStudent: rows[0],
        results: res,
      });
      return rows[0];
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  // Find one student by filter
  static findOne = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${Student.queryFields} 
       FROM students NATURAL JOIN users 
       WHERE ${filterKeys}`,
      filterValues,
    );
    if (rows.length) {
      console.log("Found student: ", { filters: filters, results: rows[0] });
      return rows[0];
    } else {
      console.log("Found no student: ", { filters: filters });
      return null;
    }
  };

  // Find all students by filter
  static findAll = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${Student.queryFields} 
       FROM students NATURAL JOIN users  
       WHERE ${filterKeys}`,
      filterValues,
    );
    console.log("Found students: ", { filters: filters, results: rows });
    return rows;
  };

  static getAll = async () => {
    const [rows, fields] = await sql.query(
      `SELECT ${Student.queryFields} 
       FROM students NATURAL JOIN users`,
    );
    console.log("Get all students: ", { results: rows });
    return rows;
  };

  // Update student by filters
  static updateById = async (id, columns) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [res, _] = await con.query(
        `UPDATE students SET ?
        WHERE id=?`,
        [columns, id],
      );
      const [rows, fields] = await con.query(
        `SELECT ${Student.queryFields} 
         FROM students NATURAL JOIN users
         WHERE id=?`,
        [id],
      );

      console.log("Updated students by Id", {
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

  // Delete student by filters
  static deleteById = async (id) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [rows, fields] = await con.query(
        `SELECT ${Student.queryFields} 
         FROM students NATURAL JOIN users
         WHERE id=?`,
        [id],
      );

      const [res, _] = await con.query(
        `DELETE FROM students 
        WHERE id=?`,
        [id],
      );

      console.log("Deleted students by id", {
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
module.exports = Student;
