const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");
// Constructor
class Tutor {
  constructor(tutor) {
    this.id = tutor.id;
    this.admin_id = tutor.admin_id;
    this.verified = tutor.verified || 0;
    this.profit = tutor.profit || 0;
  }

  static queryFields = `id, admin_id, verified, profit`;

  // Create new tutor
  static create = async (newTutor) => {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();

      const [res, _] = await con.query(`INSERT INTO tutors SET ?`, newTutor);
      const [rows, fields] = await con.query(
        `SELECT ${Tutor.queryFields} 
         FROM tutors NATURAL JOIN users 
         WHERE id=?`,
        [newTutor.id],
      );

      await con.commit();
      sql.releaseConnection(con);

      console.log("Created tutors: ", { newTutor: rows[0], results: res });
      return rows[0];
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  // Find one tutor by filter
  static findOne = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${Tutor.queryFields} 
       FROM tutors NATURAL JOIN users 
       WHERE ${filterKeys}`,
      filterValues,
    );
    if (rows.length) {
      console.log("Found tutor: ", { filters: filters, results: rows[0] });
      return rows[0];
    } else {
      console.log("Found no tutor: ", { filters: filters });
      return null;
    }
  };

  // Find all tutors by filter
  static findAll = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${Tutor.queryFields} 
       FROM tutors NATURAL JOIN users  
       WHERE ${filterKeys}`,
      filterValues,
    );
    console.log("Found tutors: ", { filters: filters, results: rows });
    return rows;
  };

  static getAll = async () => {
    const [rows, fields] = await sql.query(
      `SELECT ${Tutor.queryFields} 
       FROM tutors NATURAL JOIN users`,
    );
    console.log("Get all tutors: ", { results: rows });
    return rows;
  };

  // Update tutor by filters
  static updateById = async (id, columns) => {
    const con = await sql.getConnection();

    try {
      const [res, _] = await con.query(
        `UPDATE tutors SET ?
        WHERE id=?`,
        [columns, id],
      );
      const [rows, fields] = await con.query(
        `SELECT ${Tutor.queryFields} 
         FROM tutors 
         WHERE id=?`,
        [id],
      );

      console.log("Updated tutors by Id", {
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

  // Delete tutor by filters
  static deleteById = async (id) => {
    const con = await sql.getConnection();

    try {
      const [rows, fields] = await con.query(
        `SELECT ${Tutor.queryFields} 
         FROM tutors  
         WHERE id=?`,
        [id],
      );

      const [res, _] = await con.query(
        `DELETE FROM tutors 
        WHERE id=?`,
        [id],
      );

      console.log("Deleted tutors by id", {
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
module.exports = Tutor;

