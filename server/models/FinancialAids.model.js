const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");
// Constructor
class FinancialAid {
  constructor(financialAid) {
    this.student_id = financialAid.student_id;
    this.course_id = financialAid.course_id;
    this.essay = financialAid.essay;
    this.amount = financialAid.amount;
    this.status = financialAid.state || "PENDING";
  }

  static queryFields = `student_id, username, course_id, essay, amount, status`;

  // Create new financialAid
  static create = async (newFinancialAid) => {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();

      const [res, _] = await con.query(
        `INSERT INTO financial_aids SET ?`,
        newFinancialAid,
      );

      await con.commit();
      sql.releaseConnection(con);

      console.log("Created financialAids: ", {
        newFinancialAid: newFinancialAid,
        results: res,
      });
      return newFinancialAid;
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  // Find one financialAid by filter
  static findOne = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${FinancialAid.queryFields}
       FROM financial_aids JOIN (students NATURAL JOIN users) ON student_id=students.id
       WHERE ${filterKeys}`,
      filterValues,
    );
    if (rows.length) {
      console.log("Found financial aid: ", {
        filters: filters,
        results: rows[0],
      });
      return rows[0];
    } else {
      console.log("Found no financial aid: ", { filters: filters });
      return null;
    }
  };

  // Find all financialAids by filter
  static findAll = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${FinancialAid.queryFields}
       FROM financial_aids JOIN (students NATURAL JOIN users) ON student_id=students.id
       WHERE ${filterKeys}`,
      filterValues,
    );
    console.log("Found financial aids: ", { filters: filters, results: rows });
    return rows;
  };

  static getAll = async () => {
    const [rows, fields] = await sql.query(
      `SELECT ${FinancialAid.queryFields} 
       FROM financial_aids JOIN (students NATURAL JOIN users) ON student_id=students.id`,
    );
    console.log("Get all financialAids: ", { results: rows });
    return rows;
  };

  // Update financialAid by filters
  static updateById = async (course_id, student_id, columns) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [res, _] = await con.query(
        `UPDATE financial_aids SET ?
         WHERE course_id=? AND student_id=?`,
        [columns, course_id, student_id],
      );
      const [rows, fields] = await con.query(
        `SELECT ${FinancialAid.queryFields} 
         FROM financial_aids JOIN (students NATURAL JOIN users) ON student_id=students.id
         WHERE course_id=? AND student_id=?`,
        [course_id, student_id],
      );

      console.log("Updated financial aids by Id", {
        course_id: course_id,
        student_id: student_id,
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

  // Delete financialAid by filters
  static deleteById = async (course_id, student_id) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [rows, fields] = await con.query(
        `SELECT ${FinancialAid.queryFields} 
         FROM financial_aids JOIN (students NATURAL JOIN users) ON student_id=students.id
         WHERE course_id=? AND student_id=?`,
        [course_id, student_id],
      );

      const [res, _] = await con.query(
        `DELETE FROM financial_aids 
         WHERE course_id=? AND student_id=?`,
        [course_id, student_id],
      );

      console.log("Deleted financial aids by id", {
        course_id: course_id,
        student_id: student_id,
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
module.exports = FinancialAid;
