const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");

//Constructor
class Language {
  constructor(Language) {
    // this.id = Language.id || null;
    this.language_name = Language.language_name;
  }

  static queryFields = `id , language_name`;

  // Create new language
  static create = async (newLanguage) => {
    const con = await sql.getConnection(); //con luu gi
    try {
      await con.beginTransaction();

      const [res, _] = await con.query(
        `INSERT INTO languages SET ?`,
        newLanguage
      );

      const [row, fields] = await con.query(
        `SELECT ${Language.queryFields}
        FROM languages
        WHERE language_name = ?`,
        language_name
      );

      await con.commit();
      sql.releaseConnection(con);

      console.log("Create language: ", {
        newLanguage: row[0],
        results: res,
      });
      return row[0];
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  static findOne = async (filters) => {
    const { filterKey, filterValue } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${Language.queryFields}
      FROM languages
      WHERE ${filterKey}`,
      filterValue
    );

    if (rows.length) {
      console.log("Found language: ", { filters: filters, results: rows[0] });
      return rows[0];
    } else {
      console.log("Cannot find language: ", { filters: filters });
      return null;
    }
  };

  static getAll = async () => {
    const [rows, fields] = await sql.query(
      `SELECT ${Language.queryFields}
      FROM languages`
    );

    console.log("Get all languages: ", { results: row });
    return rows;
  };

  static updateById = async (id, column) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [res, _] = await con.query(
        `UPDATE languages SET ?
        WHERE id=?`,
        [column, id]
      ); //update

      const [rows, fields] = await con.query(
        `SELECT ${Language.queryFields}
        FROM languages
        WHERE id=?`,
        [id]
      ); //select de return lai cai da duoc update

      console.log("Updated language by Id", {
        id: id,
        column: column,
        results: res,
      });

      con.commit();
      sql.releaseConnection(con);
      if (res.affectedRows == 0) return null;
      else return rows;
    } catch (err) {
      await con.releaseConnection(con);

      throw err;
    }
  };

  static deleteById = async (id) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [rows, fields] = await con.query(
        `SELECT ${Language.queryFields} 
        FROM languages  
        WHERE id=?`,
        [id]
      );

      const [res, _] = await con.query(
        `DELETE FROM languages 
        WHERE id=?`,
        [id]
      );

      console.log("Deleted language by id", {
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

module.exports = Language;