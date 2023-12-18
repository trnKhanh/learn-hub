// models
const LessonManager = require("./LessonManager.model");

const sql = require("../database/db");

const { formatFilters } = require("../utils/query.utils");
class Documents {
  constructor(document) {
    this.course_id = document.course_id || null;
    this.lesson_id = document.lesson_id || null;
    this.name = document.name || null;
    this.file_path = document.file_path || null;
    this.id = document.id || null;

    this.basic_filters = {
      course_id: this.course_id,
      lesson_id: this.lesson_id,
    };
  }

  getFiltersAfterFormat(filters = {}) {
    filters = {
      ...this.basic_filters,
      ...filters,
    };

    const { filterKeys, filterValues } = formatFilters(filters);
    return { filterKeys, filterValues };
  }

  async create() {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();

      await this.getId();
      const [res, _] = await con.query(`INSERT INTO documents SET ?`, this);

      const { filterKeys, filterValues } = this.getFiltersAfterFormat({
        id: this.id,
      });

      const [rows, fields] = await con.query(
        `SELECT * FROM documents WHERE ${filterKeys}`,
        { filterValues }
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
      const { filterKeys, filterValues } = this.getFiltersAfterFormat({});
      const [rows, fields] = await sql.query(
        `SELECT MAX(id) max_id FROM documents WHERE ${filterKeys}`,
        filterValues
      );

      if (!rows[0].max_id) rows[0].max_id = 0;

      this.id = rows[0].max_id + 1;
      return this;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async findAll(filters) {
    try {
      const { filterKeys, filterValues } = this.getFiltersAfterFormat(filters);
      const [rows, fields] = await sql.query(
        `SELECT * FROM documents WHERE ${filterKeys}`,
        filterValues
      );
      return rows;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  // static async getAllPublished(document) {
  //   try {
  //     let lessonManager = new LessonManager(
  //       document.course_id,
  //       document.lesson_id
  //     );
  //     let documents = await lessonManager.findAllWithDocument({
  //       "l.is_published": true,
  //     });
  //     return documents;
  //   } catch (errors) {
  //     console.log(errors);
  //     throw errors;
  //   }
  // }

  async findOne() {
    try {
      // let lessonManager = new LessonManager(
      //   document.course_id,
      //   document.lesson_id
      // );
      // let documents = await lessonManager.findAllWithDocument({
      //   "d.id": document.id,
      // });

      // if (!documents.length) {
      //   return null;
      // }
      // return documents[0];

      const { filterKeys, filterValues } = this.getFiltersAfterFormat({
        id: this.id,
      });

      const [rows, fields] = await sql.query(
        `SELECT * FROM documents WHERE ${filterKeys}`,
        filterValues
      );

      if (!rows.length) return null;
      return rows[0];
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async updateById(newData) {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();

      const { filterKeys, filterValues } = this.getFiltersAfterFormat({
        id: this.id,
      });

      const [res, _] = await con.query(
        `UPDATE documents SET ? WHERE ${filterKeys}`,
        [newData, ...filterValues]
      );
      const [rows, fields] = await con.query(
        `SELECT * FROM documents WHERE ${filterKeys}`,
        filterValues
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

    // console.log(">>> Documents.model > deleteById > this: ", this.id);
    try {
      await con.beginTransaction();

      const { filterKeys, filterValues } = this.getFiltersAfterFormat({
        id: this.id,
      });

      const [rows, fields] = await con.query(
        `SELECT * FROM documents WHERE ${filterKeys}`,
        filterValues
      );

      const [res, _] = await con.query(
        `DELETE FROM documents WHERE ${filterKeys}`,
        filterValues
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
}

module.exports = Documents;
