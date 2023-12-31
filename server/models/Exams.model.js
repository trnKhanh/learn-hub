const LessonManager = require("./LessonManager.model");
const { formatFilters } = require("../utils/query.utils");
const sql = require("../database/db");

class Exams {
  constructor(exams) {
    this.course_id = exams.course_id || null;
    this.lesson_id = exams.lesson_id || null;
    this.name = exams.name || null;
    this.percentage = exams.percentage || null;
    this.id = exams.id || null;

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

  async check(con) {
    const promise = [this.checkPercentage(con)];

    const checks = await Promise.all(promise);

    let errorMessage = checks.find((check) => typeof check == "string");

    if (errorMessage) throw new Error(errorMessage);
  }

  // return true or String("error message")
  async checkPercentage(con) {
    const { filterKeys, filterValues } = this.getFiltersAfterFormat();
    const [rows, fields] = await con.query(
      `SELECT SUM(percentage) total_percentage FROM exams WHERE ${filterKeys}`,
      filterValues
    );

    if (rows[0].total_percentage > 1) return "Total percentage must be <= 1";
    return true;
  }

  async getId() {
    if (this.id) return this;

    try {
      const { filterKeys, filterValues } = formatFilters(this.basic_filters);
      const [rows, fields] = await sql.query(
        `SELECT MAX(id) max_id FROM exams WHERE ${filterKeys}`,
        filterValues
      );

      if (!rows[0].max_id) rows[0].max_id = 0;

      this.id = rows[0].max_id + 1;
      return this;
    } catch (errors) {
      // console.log(errors);
      throw errors;
    }
  }

  async create() {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();

      await this.getId();
      const [res, _] = await con.query(`INSERT INTO exams SET ?`, this);

      const { filterKeys, filterValues } = this.getFiltersAfterFormat({
        id: this.id,
      });

      const [rows, fields] = await con.query(
        `SELECT * FROM exams WHERE ${filterKeys}`,
        filterValues
      );

      // console.log(`>>> Exams.model > create: ${rows[0]}`);

      await this.check(con);

      await con.commit();
      sql.releaseConnection(con);

      if (res.affectedRows == 0) return null;
      return rows[0];
    } catch (errors) {
      await con.rollback();
      sql.releaseConnection(con);

      // console.log(errors);
      throw errors;
    }
  }

  async findAll(filters) {
    try {
      // const lessonManager = new LessonManager(this.course_id, this.lesson_id);
      // const exams = await lessonManager.findAllWithExam(filters);
      // return exams;

      const { filterKeys, filterValues } = this.getFiltersAfterFormat(filters);
      const [rows, fields] = await sql.query(
        `SELECT * FROM exams WHERE ${filterKeys}`,
        filterValues
      );
      return rows;
    } catch (errors) {
      // console.log(errors);
      throw errors;
    }
  }

  static async findOne(filters) {
    try {
      // const lessonManager = new LessonManager(
      //   filters.course_id,
      //   filters.lesson_id
      // );
      // const exams = await lessonManager.findAllWithExam({
      //   "e.id": filters.id,
      // });

      // if (!exams.length) {
      //   return null;
      // }
      // return exams[0];

      const { filterKeys, filterValues } = getFiltersAfterFormat(filters);
      const [rows, fields] = await sql.query(
        `SELECT * FROM exams WHERE ${filterKeys}`,
        filterValues
      );
      if (!rows.length) return null;
      return rows[0];
    } catch (errors) {
      // console.log(errors);
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
        `UPDATE exams SET ? WHERE ${filterKeys}`,
        [newData, ...filterValues]
      );
      const [rows, fields] = await con.query(
        `SELECT * FROM exams WHERE ${filterKeys}`,
        filterValues
      );

      await this.check(con);

      await con.commit();
      sql.releaseConnection(con);

      if (res.affectedRows == 0) return null;
      return rows[0];
    } catch (errors) {
      await con.rollback();
      sql.releaseConnection(con);

      // console.log(errors);
      throw errors;
    }
  }

  async deleteById() {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();

      const { filterKeys, filterValues } = this.getFiltersAfterFormat({
        id: this.id,
      });

      const [rows, fields] = await con.query(
        `SELECT * FROM exams WHERE ${filterKeys}`,
        filterValues
      );

      const [res, _] = await con.query(
        `DELETE FROM exams WHERE ${filterKeys}`,
        filterValues
      );

      await con.commit();
      sql.releaseConnection(con);

      if (res.affectedRows == 0) return null;
      return this;
    } catch (errors) {
      await con.rollback();
      sql.releaseConnection(con);

      // console.log(errors);
      throw errors;
    }
  }
}

module.exports = Exams;
