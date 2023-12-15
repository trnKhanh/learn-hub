const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");

// Constructor
class PaymentInformation {
  constructor(paymentInformation) {
    this.user_id = paymentInformation.user_id || null;
    this.card = paymentInformation.card || null;
    this.expire_date = paymentInformation.expire_date || null;
  }
  static queryFields = `card, expire_date`;

  // Create new PaymentInformation
  static create = async (newPaymentInformation) => {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();
      const [res, _] = await con.query(
        `INSERT INTO payment_informations SET ?`,
        newPaymentInformation,
      );

      await con.commit();
      sql.releaseConnection(con);

      console.log("Created payment information: ", {
        newPaymentInformation: newPaymentInformation,
        results: res,
      });
      return newPaymentInformation;
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  // Find one payment_information by filter
  static findOne = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${PaymentInformation.queryFields} FROM payment_informations WHERE ${filterKeys}`,
      filterValues,
    );
    if (rows.length) {
      console.log("Found payment information: ", {
        filters: filters,
        results: rows[0],
      });
      return rows[0];
    } else {
      console.log("Found no payment information: ", { filters: filters });
      return null;
    }
  };

  // Find all payment_informations by filter
  static findAll = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${PaymentInformation.queryFields} FROM payment_informations WHERE ${filterKeys}`,
      filterValues,
    );
    console.log("Found payment informations: ", {
      filters: filters,
      results: rows,
    });
    return rows;
  };

  static getAll = async () => {
    const [rows, fields] = await sql.query(
      `SELECT ${PaymentInformation.queryFields} FROM payment_informations`,
    );
    console.log("Get all payment informations: ", { results: rows });
    return rows;
  };

  static delete = async (user_id, card) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [rows, fields] = await con.query(
        `SELECT ${PaymentInformation.queryFields} 
        FROM payment_informations 
        WHERE user_id=? AND card=?`,
        [user_id, card],
      );

      const [res, _] = await con.query(
        `DELETE FROM payment_informations 
        WHERE user_id=? AND card=?`,
        [user_id, card],
      );

      console.log("Deleted payment informations", {
        user_id: user_id,
        card: card,
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
module.exports = PaymentInformation;
