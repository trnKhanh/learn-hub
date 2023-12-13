const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");
const User = require("../models/Users.model");
// Constructor
class Supporter {
  constructor(supporter) {
    this.id = supporter.id || null;
    this.role = supporter.role || null;
  }

  static queryFields = `${User.queryFields}, role`;

  // Create new Supporter
  static create = async (newSupporter) => {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();

      const [res, _] = await con.query(
        `INSERT INTO supporters SET ?`,
        newSupporter,
      );
      const [rows, fields] = await con.query(
        `SELECT ${Supporter.queryFields} 
         FROM supporters NATURAL JOIN users 
         WHERE id=?`,
        [newSupporter.id],
      );

      await con.commit();
      sql.releaseConnection(con);

      console.log("Created supporters: ", {
        newSupporter: rows[0],
        results: res,
      });
      return rows[0];
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  // Find one supporter by filter
  static findOne = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${Supporter.queryFields} 
       FROM supporters NATURAL JOIN users 
       WHERE ${filterKeys}`,
      filterValues,
    );
    if (rows.length) {
      console.log("Found supporter: ", { filters: filters, results: rows[0] });
      return rows[0];
    } else {
      console.log("Found no supporter: ", { filters: filters });
      return null;
    }
  };

  // Find all supporters by filter
  static findAll = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${Supporter.queryFields} 
       FROM supporters NATURAL JOIN users  
       WHERE ${filterKeys}`,
      filterValues,
    );
    console.log("Found supporters: ", { filters: filters, results: rows });
    return rows;
  };

  static getAll = async () => {
    const [rows, fields] = await sql.query(
      `SELECT ${Supporter.queryFields} 
       FROM supporters NATURAL JOIN users`,
    );
    console.log("Get all supporters: ", { results: rows });
    return rows;
  };

  // Update supporter by filters
  static updateById = async (id, columns) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [res, _] = await con.query(
        `UPDATE supporters SET ?
        WHERE id=?`,
        [columns, id],
      );
      const [rows, fields] = await con.query(
        `SELECT ${Supporter.queryFields} 
         FROM supporters 
         WHERE id=?`,
        [id],
      );

      console.log("Updated supporters by Id", {
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

  // Delete supporter by filters
  static deleteById = async (id) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [rows, fields] = await con.query(
        `SELECT ${Supporter.queryFields} 
         FROM supporters  
         WHERE id=?`,
        [id],
      );

      const [res, _] = await con.query(
        `DELETE FROM supporters 
        WHERE id=?`,
        [id],
      );

      console.log("Deleted supporters by id", {
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
module.exports = Supporter;
