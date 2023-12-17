// models
const LessonManager = require("./LessonManager.model");
const sql = require("../database/db");

class Documents {
  constructor(document) {
    this.course_id = document.course_id || null;
    this.lesson_id = document.lesson_id || null;
    this.name = document.name || null;
    this.file_path = document.file_path || null;
    this.id = document.id || null;
  }

  async create() {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();

      this.getId();
      const [res, _] = await sql.query(`INSERT INTO documents SET ?`, this);
      const [rows, fields] = await sql.query(
        `SELECT * FROM documents WHERE id=?`,
        [this.id]
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

  async getId() {
    if (this.id) return this;

    try {
      const [rows, fields] = await sql.query(
        `SELECT MAX(id) max_id FROM documents WHERE course_id=${this.course_id} AND lesson_id=${this.lesson_id}`
      );

      this.id = rows[0].max_id + 1;
      return this;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  static async getAll(document) {
    try {
      let lessonManager = new LessonManager(
        document.course_id,
        document.lesson_id
      );
      let documents = await lessonManager.findAllWithDocument();
      return documents;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  static async findOne(document) {
    try {
      let lessonManager = new LessonManager(
        document.course_id,
        document.lesson_id
      );
      let documents = await lessonManager.findAllWithDocument({
        id: document.id,
      });

      if (!documents.length) {
        return null;
      }
      return documents[0];
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async updateById() {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();

      const [res, _] = await sql.query(`UPDATE documents SET ? WHERE id=?`, [
        this,
        this.id,
      ]);
      const [rows, fields] = await sql.query(
        `SELECT * FROM documents WHERE id=?`,
        [this.id]
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

    console.log(">>> Documents.model > deleteById > this: ", this.id);
    try {
      await con.beginTransaction();

      const [rows, fields] = await sql.query(
        `SELECT * FROM documents WHERE id=?`,
        [this.id]
      );

      const [res, _] = await sql.query(`DELETE FROM documents WHERE id=?`, [
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
}

module.exports = Documents;
