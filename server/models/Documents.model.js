const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");

class Document {
  constructor(document) {
    this.id = document.id;
    this.name = document.name;
    this.course_id = document.course_id;
    this.lesson_id = document.lesson_id;
    this.file_path = document.file_path;
  }

  static queryFields = `id, name, course_id, lesson_id, file_path`;

  static getAll = async (course_id) => {
    const [rows, fields] = await sql.query(
      `SELECT ${Document.queryFields} FROM documents WHERE course_id=?`,
      [course_id],
    );
    return rows;
  };

  static create = async (newDocument) => {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();
      const [res, _] = await con.query(
        `INSERT INTO documents SET ?`,
        newDocument,
      );
      const [rows, fields] = await con.query(
        `SELECT ${Document.queryFields} FROM documents WHERE id=?`,
        res.insertId,
      );

      await con.commit();
      sql.releaseConnection(con);

      //console.log("Created lesson: ", { newLesson: rows[0], results: res });
      return rows[0];
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);
      throw err;
    }
  };

  static findOne = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${Document.queryFields} FROM documents WHERE ${filterKeys}`,
      filterValues,
    );
    if (rows.length) {
      console.log("Found lesson: ", { filters: filters, results: rows[0] });
      return rows[0];
    } else {
      console.log("Found no lesson: ", { filters: filters });
      return null;
    }
  };

  static findAll = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${Document.queryFields} FROM documents WHERE ${filterKeys}`,
      filterValues,
    );
    return rows;
  };
}

module.exports = Document;
