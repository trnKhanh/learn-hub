const { formatFilters } = require("../utils/query.utils");
const sql = require("../database/db");

class TeachCourse {
  constructor(teachCourse) {
    this.tutor_id = teachCourse.tutor_id || null;
    this.course_id = teachCourse.course_id || null;
    this.profit_rate = teachCourse.profit_rate || null;
  }

  static async create(teachCourse) {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();

      const [res, _] = await con.query(
        `INSERT INTO teach_courses SET ?`,
        teachCourse,
      );
      const [rows, fields] = await con.query(
        `SELECT * FROM teach_courses WHERE tutor_id=? AND course_id=?`,
        [teachCourse.tutor_id, teachCourse.course_id],
      );

      await con.commit();
      sql.releaseConnection(con);

      return rows[0];
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  }

  static async findAll(filters) {
    try {
      const { filterKeys, filterValues } = formatFilters(filters);
      const [rows, fields] = await sql.query(
        `SELECT * FROM teach_courses WHERE ${filterKeys}`,
        filterValues,
      );
      return rows;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async findOne(filters) {
    try {
      const { filterKeys, filterValues } = formatFilters(filters);
      const [rows, fields] = await sql.query(
        `SELECT * FROM teach_courses WHERE ${filterKeys} LIMIT 1`,
        filterValues,
      );
      if (rows.length) {
        return rows[0];
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async updateById(course_id, tutor_id, columns) {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [res, _] = await con.query(
        `UPDATE teach_courses SET ? 
        WHERE tutor_id=? AND course_id=?`,
        [columns, tutor_id, course_id],
      );

      const [rows, fields] = await con.query(
        `SELECT * FROM teach_courses 
        WHERE tutor_id=? AND course_id=?`,
        [tutor_id, course_id],
      );

      await con.commit();
      sql.releaseConnection(con);

      if (res.affectedRows == 0) return null;
      else return rows[0];
    } catch (error) {
      await con.rollback();
      sql.releaseConnection(con);

      console.log(error);
      throw error;
    }
  }

  static async updateAll(filters, columns) {
    const [filterKeys, filterValues] = formatFilters(filters);

    let con = await sql.getConnection();
    try {
      await con.beginTransaction();
      const [res, _] = await con.query(
        `UPDATE teach_courses SET ? WHERE ${filterKeys}`,
        [columns, ...filterValues],
      );

      const [rows, fields] = await con.query(
        `SELECT * FROM teach_courses WHERE ${filterKeys}`,
        filterValues,
      );

      await con.commit();
      sql.releaseConnection(con);

      if (res.affectedRows == 0) return null;
      else return rows;
    } catch (error) {
      await con.rollback();
      sql.releaseConnection(con);

      console.log(error);
      throw error;
    }
  }

  static async deleteById(course_id, tutor_id) {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [rows, fields] = await con.query(
        `SELECT * FROM teach_courses 
        WHERE tutor_id=? AND course_id=?`,
        [tutor_id, course_id],
      );

      const [res, _] = await con.query(
        `DELETE FROM teach_courses 
        WHERE tutor_id=? AND course_id=?`,
        [tutor_id, course_id],
      );

      await con.commit();
      sql.releaseConnection(con);

      if (res.affectedRows == 0) return null;
      else return rows[0];
    } catch (error) {
      await con.rollback();
      sql.releaseConnection(con);

      console.log(error);
      throw error;
    }
  }

  static async deleteAll(filters) {
    const [filterKeys, filterValues] = formatFilters(filters);

    let con = await sql.getConnection();
    try {
      await con.beginTransaction();
      const [rows, fields] = await con.query(
        `SELECT * FROM teach_courses WHERE ${filterKeys}`,
        filterValues,
      );

      const [res, _] = await con.query(
        `DELETE FROM teach_courses WHERE ${filterKeys}`,
        filterValues,
      );

      await con.commit();
      sql.releaseConnection(con);

      if (res.affectedRows == 0) return null;
      else return rows;
    } catch (error) {
      await con.rollback();
      sql.releaseConnection(con);

      console.log(error);
      throw error;
    }
  }
}

module.exports = TeachCourse;
