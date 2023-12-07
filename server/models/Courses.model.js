const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");

// Constructor
class Course {
  constructor(course) {
    this.name = course.name || null;
    this.description = course.description || null;
    this.difficulty = course.difficulty || null;
    this.duration = course.duration || null;
    this.owner_id = course.owner_id || null;
    this.price = course.price || null;
    this.discount = course.discount || null;
  }
  static queryFields = `id, name, description, difficulty, duration, owner_id, price, discount`;

  // Create new Course
  static create = async (newCourse) => {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();
      const [res, _] = await con.query(`INSERT INTO courses SET ?`, newCourse);
      const [rows, fields] = await con.query(
        `SELECT ${Course.queryFields} FROM courses WHERE id=?`,
        res.insertId,
      );

      await con.commit();
      sql.releaseConnection(con);

      console.log("Created course: ", { newCourse: rows[0], results: res });
      return rows[0];
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  // Find one course by filter
  static findOne = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${Course.queryFields} FROM courses WHERE ${filterKeys}`,
      filterValues,
    );
    if (rows.length) {
      console.log("Found course: ", { filters: filters, results: rows[0] });
      return rows[0];
    } else {
      console.log("Found no course: ", { filters: filters });
      return null;
    }
  };

  // Find all courses by filter
  static findAll = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${Course.queryFields} FROM courses WHERE ${filterKeys}`,
      filterValues,
    );
    console.log("Found courses: ", { filters: filters, results: rows });
    return rows;
  };

  static getAll = async () => {
    const [rows, fields] = await sql.query(
      `SELECT ${Course.queryFields} FROM courses`
    );
    console.log("Get all courses: ", { results: rows });
    return rows;
  };

  // Update course by filters
  static updateById = async (id, columns) => {
    const con = await sql.getConnection();

    try {
      const [res, _] = await con.query(
        `UPDATE courses SET ? WHERE id=?`,
        [columns, id],
      );
      const [rows, fields] = await con.query(
        `SELECT ${Course.queryFields} FROM courses WHERE id=?`,
        [id],
      );

      console.log("Updated courses", {
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

  // Delete course by filters
  static deleteById = async (id) => {
    const con = await sql.getConnection();

    try {
      const [rows, fields] = await con.query(
        `SELECT ${Course.queryFields} FROM courses WHERE id=?`,
        [id],
      );

      const [res, _] = await con.query(
        `DELETE FROM courses WHERE id=?`,
        [id],
      );

      console.log("Deleted courses", {
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
module.exports = Course;
