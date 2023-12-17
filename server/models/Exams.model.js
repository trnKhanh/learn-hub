const LessonManager = require("./LessonManager.model");
const formatFilters = require("../utils/formatFilters");

class Exams {
  constructor(exams) {
    this.course_id = exams.course_id || null;
    this.lesson_id = exams.lesson_id || null;
    this.name = exams.name || null;
    this.percentage = exams.percentage || null;
    this.id = exams.id || null;
  }

  async getId() {
    if (this.id) return this;

    try {
      const [rows, fields] = await sql.query(
        `SELECT MAX(id) max_id FROM exams WHERE course_id=${this.course_id} AND lesson_id=${this.lesson_id}`
      );

      this.id = rows[0].max_id + 1;
      return this;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async create() {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();

      this.getId();
      const [res, _] = await sql.query(`INSERT INTO exams SET ?`, this);
      const [rows, fields] = await sql.query(`SELECT * FROM exams WHERE id=?`, [
        this.id,
      ]);

      await con.commit();
      sql.releaseConnection(con);

      if (res.affectedRows == 0) return null;
      return rows[0];
    } catch (errors) {
      await con.rollback();
      sql.releaseConnection(con);

      console.log(errors);
      throw errors;
    }
  }

  async findAll(filters) {
    try {
      const lessonManager = new LessonManager(this.course_id, this.lesson_id);
      const exams = await lessonManager.findAllWithExam(filters);
      return exams;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  static async findOne(filters) {
    try {
      const lessonManager = new LessonManager(
        filters.course_id,
        filters.lesson_id
      );
      const exams = await lessonManager.findAllWithExam({
        "e.id": filters.id,
      });

      if (!exams.length) {
        return null;
      }
      return exams[0];
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async updateById(filters) {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();
      const [filtersKeys, filtersValues] = formatFilters(filters);
      const [res, _] = await sql.query(
        `UPDATE exams SET ? WHERE course_id=${this.course_id} AND lesson_id=${this.lesson_id} AND id=${this.id}`,
        filters
      );
      const [rows, fields] = await sql.query(
        `SELECT * FROM exams WHERE course_id=${this.course_id} AND lesson_id=${this.lesson_id} AND id=${this.id}`
      );

      await con.commit();
      sql.releaseConnection(con);

      if (res.affectedRows == 0) return null;
      return rows[0];
    } catch (errors) {
      await con.rollback();
      sql.releaseConnection(con);

      console.log(errors);
      throw errors;
    }
  }

  async deleteById() {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();

      const [rows, fields] = await sql.query(`SELECT * FROM exams WHERE id=?`, [
        this.id,
      ]);

      const [res, _] = await sql.query(
        `DELETE FROM exams WHERE course_id=${this.course_id} AND lesson_id=${this.lesson_id} AND id=${this.id}`
      );

      await con.commit();
      sql.releaseConnection(con);

      if (res.affectedRows == 0) return null;
      return this;
    } catch (errors) {
      await con.rollback();
      sql.releaseConnection(con);

      console.log(errors);
      throw errors;
    }
  }
}
