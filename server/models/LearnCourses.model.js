const sql = require("../database/db.js");
const { formatFilters } = require("../utils/query.utils.js");

class LearnCourses {
  constructor(learnCourse) {
    this.course_id = learnCourse.course_id;
    this.user_id = learnCourse.user_id;
    this.registered_at = learnCourse.registered_at;
    this.finished_at = learnCourse.finished_at;
  }

  static async create(learnCourse) {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();
      const [res, _] = await con.query(
        `INSERT INTO learn_courses SET ?`,
        learnCourse
      );

      const [rows, fields] = await con.query(
        `SELECT * FROM learn_courses WHERE course_id = ? && student_id = ?`,
        [learnCourse.course_id, learnCourse.student_id]
      );

      await con.commit();
      if (rows.length) {
        return rows[0];
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      await con.rollback();
      throw err;
    } finally {
      sql.releaseConnection(con);
    }
  }

  static async findOne(filters) {
    const { filterKeys, filterValues } = formatFilters(filters);
    try {
      const [rows, fields] = await sql.query(
        `SELECT * FROM learn_courses WHERE ${filterKeys} LIMIT 1`,
        filterValues
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

  static async findAll(filters) {
    const { filterKeys, filterValues } = formatFilters(filters);
    try {
      const [rows, fields] = await sql.query(
        `SELECT * FROM learn_courses WHERE ${filterKeys}`,
        filterValues
      );
      return rows;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async update(learnCourse) {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();
      const [res, _] = await con.query(
        `UPDATE learn_courses SET ? WHERE course_id = ? && student_id = ?`,
        [learnCourse, learnCourse.course_id, learnCourse.student_id]
      );

      const [rows, fields] = await con.query(
        `SELECT * FROM learn_courses WHERE course_id = ? && student_id = ?`,
        [learnCourse.course_id, learnCourse.student_id]
      );

      await con.commit();
      if (res.affectedRows) {
        return rows[0];
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      await con.rollback();
      throw err;
    } finally {
      sql.releaseConnection(con);
    }
  }

  static async delete(filters) {
    const con = await sql.getConnection();
    const { filterKeys, filterValues } = formatFilters(filters);

    try {
      await con.beginTransaction();

      const [rows, fields] = await sql.query(
        `SELECT * FROM learn_courses WHERE ${filterKeys}`,
        filterValues
      );

      const [res, _] = await sql.query(
        `DELETE FROM learn_courses WHERE ${filterKeys}`,
        filterValues
      );

      await con.commit();

      if (res.affectedRows) {
        return rows[0];
      } else {
        return null;
      }
    } catch (err) {
      await con.rollback();
      console.log(err);
      throw err;
    } finally {
      sql.releaseConnection(con);
    }
  }

  static async deleteAll(filters) {
    const con = await sql.getConnection();
    const { filterKeys, filterValues } = formatFilters(filters);
    try {
      await con.beginTransaction();
      const [rows, fields] = await sql.query(
        `SELECT * FROM learn_courses WHERE ${filterKeys}`,
        filterValues
      );

      const [res, _] = await sql.query(
        `DELETE FROM learn_courses WHERE ${filterKeys}`,
        filterValues
      );

      await con.commit();
      return rows;
    } catch (err) {
      await con.rollback();
      console.log(err);
      throw err;
    } finally {
      sql.releaseConnection(con);
    }
  }
}

module.exports = LearnCourses;
