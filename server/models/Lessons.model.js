const sql = require("../database/db.js");
const LessonManager = require("./LessonManager.model.js");
const { formatFilters } = require("../utils/query.utils.js");

class Lesson {
  constructor(lesson) {
    this.id = lesson.id || null;
    this.name = lesson.name || null;
    this.course_id = lesson.course_id || null;
    this.is_free =
      lesson.is_free == true || lesson.is_free == "true" ? true : false;
    this.is_published =
      lesson.is_published == true || lesson.is_published == "true"
        ? true
        : false;
  }

  async getId() {
    if (this.id) return this;

    // find the max id in table
    const [rows, fields] = await sql.query(
      `SELECT MAX(id) max_id FROM lessons`
    );

    // console.log("Found max id: ", { results: rows[0] });

    this.id = rows[0].max_id + 1;

    return this;
  }

  async create() {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();

      await this.getId();

      console.log(">>> LessonManager >> create >> newLesson: ", this);

      const [res, _] = await sql.query(`INSERT INTO lessons SET ?`, this);
      const [rows, fields] = await sql.query(
        `SELECT * FROM lessons WHERE id=?`,
        [this.id]
      );

      await con.commit();
      sql.releaseConnection(con);

      if (res.affectedRows == 0) return null;
      // console.log("Created lesson: ", { newLesson: rows[0], results: res });
      return rows[0];
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      console.log(err);
      throw err;
    }
  }

  async isExist() {
    const filters = {
      name: this.name,
      course_id: this.course_id,
    };

    try {
      const { filterKeys, filterValues } = formatFilters(filters);
      const [rows, fields] = await sql.query(
        `SELECT * FROM lessons WHERE ${filterKeys}`,
        filterValues
      );

      if (rows.length) {
        console.log(" >>> Lessons.models > isExist > Found lesson: ", {
          lesson: this,
        });
        return true;
      } else {
        // console.log("Found no lesson: ", { lesson: this });
        return false;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findOne(filters) {
    try {
      return await new LessonManager(this.course_id, this.id).findOne(filters);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async update() {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();

      const [res, _] = await sql.query(`UPDATE lessons SET ? WHERE id=?`, [
        this,
        this.id,
      ]);
      const [rows, fields] = await sql.query(
        `SELECT * FROM lessons WHERE id=?`,
        [this.id]
      );

      await con.commit();
      sql.releaseConnection(con);

      if (res.affectedRows == 0) return null;
      // console.log("Updated lesson: ", { newLesson: rows[0], results: res });
      return rows[0];
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      console.log(err);
      throw err;
    }
  }

  static async deleteById(filter) {
    const { filterKeys, filterValues } = formatFilters(filter);

    const con = await sql.getConnection();
    try {
      await con.beginTransaction();

      const [rows, fields] = await con.query(
        `SELECT * FROM lessons WHERE ${filterKeys}`,
        filterValues
      );

      const [res, _] = await con.query(
        `DELETE FROM lessons WHERE ${filterKeys}`,
        filterValues
      );
      // console.log("Deleted lessons", {
      //   filter: filter,
      //   results: res,
      // });

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
}

module.exports = Lesson;
