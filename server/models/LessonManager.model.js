const express = require("express");
const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");

class LessonManager {
  /**
   * LessonManager sẽ có 2 chức năng
      1. basic: Cho Course_id => Tìm tất cả các lesson của course đó
      2. advance: Cho Course_id và Lesson_id => Tìm document, exam của lesson đó
   */

  constructor(course_id, lesson_id) {
    this.course_id = course_id || null;
    this.lesson_id = lesson_id || null;

    this.basic_filter = {};
    if (course_id) this.basic_filter[`l.course_id`] = course_id;
    if (lesson_id) this.basic_filter["l.id"] = lesson_id;
  }

  static LessonTables = `lessons l`;
  static LessonFields = `l.id lesson_id, l.name lesson_name`;
  static LessonOrder = `l.id ASC`;

  static DocumentTables = `documents d`;
  static DocumentFields = `d.id document_id, d.name document_name, d.file_path document_path`;
  static DocumentOrder = `d.lesson_id ASC, d.id ASC`;

  static ExamTables = `exams e`;
  static ExamFields = `e.id exam_id, e.name exam_name, e.percentage exam_percentage`;
  static ExamOrder = `e.lesson_id ASC, e.id ASC`;

  async create(newLesson) {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();

      newLesson = await newLesson.getId();

      console.log(">>> LessonManager >> create >> newLesson: ", newLesson);

      const [res, _] = await sql.query(`INSERT INTO lessons SET ?`, newLesson);
      const [rows, fields] = await sql.query(
        `SELECT ${LessonManager.LessonFields} FROM ${LessonManager.LessonTables} WHERE id=?`,
        [newLesson.id]
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

  async findAll(filters) {
    if (filters === null) filters = {};

    filters = { ...this.basic_filter, ...filters };

    const { filterKeys, filterValues } = formatFilters(filters);

    const [rows, fields] = await sql.query(
      `SELECT ${LessonManager.LessonFields} FROM ${LessonManager.LessonTables}  WHERE ${filterKeys} ORDER BY ${LessonManager.LessonOrder}`,
      filterValues
    );

    return rows;
  }

  async getAll() {
    return await this.findAll({});
  }

  async findOne(filters) {
    if (filters === null) filters = {};

    filters = { ...this.basic_filter, ...filters };

    const { filterKeys, filterValues } = formatFilters(filters);

    const [rows, fields] = await sql.query(
      `SELECT ${LessonManager.LessonFields} FROM ${LessonManager.LessonTables} WHERE ${filterKeys} ${LessonManager.LessonOrder} LIMIT 1`,
      filterValues
    );

    if (rows.length) {
      // console.log("Found lesson: ", { filters: filters, results: rows[0] });
      return rows[0];
    } else {
      // console.log("Found no lesson: ", { filters: filters });
      return null;
    }
  }

  async findAllWithDocument(filters) {
    if (filters === null) filters = {};

    filters = { ...this.basic_filter, ...filters };

    const { filterKeys, filterValues } = formatFilters(filters);

    const Fields = `${LessonManager.LessonFields}, ${LessonManager.DocumentFields}`;

    const Tables = `${LessonManager.LessonTables} LEFT JOIN ${LessonManager.DocumentTables} ON l.id = d.lesson_id and l.course_id = d.course_id`;

    const Order = `${LessonManager.LessonOrder}, ${LessonManager.DocumentOrder}`;

    const [rows, fields] = await sql.query(
      `SELECT ${Fields} FROM ${Tables} WHERE ${filterKeys} ORDER BY ${Order}`,
      filterValues
    );

    if (rows.length) {
      // console.log("Found lesson: ", { filters: filters, results: rows });
      return rows;
    } else {
      // console.log("Found no lesson: ", { filters: filters });
      return null;
    }
  }

  async findAllWithExam(filters) {
    if (filters === null) filters = {};

    filters = { ...this.basic_filter, ...filters };

    const { filterKeys, filterValues } = formatFilters(filters);

    const Fields = `${LessonManager.LessonFields}, ${LessonManager.ExamFields}`;

    const Tables = `${LessonManager.LessonTables} LEFT JOIN ${LessonManager.ExamTables} ON l.id = e.lesson_id and l.course_id = e.course_id`;

    const Order = `${LessonManager.LessonOrder}, ${LessonManager.ExamOrder}`;

    const [rows, fields] = await sql.query(
      `SELECT ${Fields} FROM ${Tables} WHERE ${filterKeys} ORDER BY ${Order}`,
      filterValues
    );

    if (rows.length) {
      // console.log("Found lesson: ", { filters: filters, results: rows });
      return rows;
    } else {
      // console.log("Found no lesson: ", { filters: filters });
      return null;
    }
  }
}
module.exports = LessonManager;
