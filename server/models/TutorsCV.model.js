const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");
// Constructor
class TutorCV {
  constructor(tutorCV) {
    this.tutor_id = tutorCV.id || null;
    this.cv_path = tutorCV.admin_id || null;
    this.status = tutorCV.status || "PENDING";
  }

  static queryFields = `tutor_id, status`;

  // Create new tutorCV
  static create = async (newTutorCV) => {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();

      const [res, _] = await con.query(
        `INSERT INTO tutor_cvs SET ?`,
        newTutorCV,
      );

      await con.commit();
      sql.releaseConnection(con);

      console.log("Created tutorCVs: ", {
        newTutorCV: newTutorCV,
        results: res,
      });
      return newTutorCV;
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  // Find one tutorCV by filter
  static findOne = async (filters, cv_path=false) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${TutorCV.queryFields}${cv_path ? ', cv_path': ''}
       FROM tutor_cvs 
       WHERE ${filterKeys}`,
      filterValues,
    );
    if (rows.length) {
      console.log("Found tutor CV: ", { filters: filters, results: rows[0] });
      return rows[0];
    } else {
      console.log("Found no tutor CV: ", { filters: filters });
      return null;
    }
  };

  // Find all tutorCVs by filter
  static findAll = async (filters, cv_path=false) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${TutorCV.queryFields}${cv_path ? ', cv_path': ''}
       FROM tutor_cvs  
       WHERE ${filterKeys}`,
      filterValues,
    );
    console.log("Found tutor CVs: ", { filters: filters, results: rows });
    return rows;
  };

  static getAll = async () => {
    const [rows, fields] = await sql.query(
      `SELECT ${TutorCV.queryFields} 
       FROM tutor_cvs`,
    );
    console.log("Get all tutorCVs: ", { results: rows });
    return rows;
  };

  // Update tutorCV by filters
  static updateById = async (id, columns) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [res, _] = await con.query(
        `UPDATE tutor_cvs SET ?
        WHERE tutor_id=?`,
        [columns, id],
      );
      const [rows, fields] = await con.query(
        `SELECT ${TutorCV.queryFields} 
         FROM tutor_cvs 
         WHERE tutor_id=?`,
        [id],
      );

      console.log("Updated tutor CVs by Id", {
        id: id,
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

  // Delete tutorCV by filters
  static deleteById = async (id) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [rows, fields] = await con.query(
        `SELECT ${TutorCV.queryFields} 
         FROM tutor_cvs  
         WHERE tutor_id=?`,
        [id],
      );

      const [res, _] = await con.query(
        `DELETE FROM tutor_cvs 
        WHERE tutor_id=?`,
        [id],
      );

      console.log("Deleted tutor CVs by id", {
        id: id,
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
module.exports = TutorCV;
