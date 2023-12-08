const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");

// Constructor
class Payment {
  constructor(payment) {
    this.student_id = payment.student_id || null;
    this.discounted = payment.discounted || null;
  }
  static queryFields = `id, student_id, paid_at, discounted`;

  // Create new Payment
  static create = async (student_id, info) => {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();
      const newPayment = new Payment({
        student_id: student_id,
        ...info,
      });
      const [res, _] = await con.query(`INSERT INTO payments SET ?`, [
        newPayment,
      ]);

      const [cart, cart_fields] = await con.query(
        `SELECT course_id FROM shopping_carts WHERE student_id=?`,
        [student_id],
      );
      await con.query("DELETE FROM shopping_carts WHERE student_id=?", [
        student_id,
      ]);
      for (const course of cart) {
        const course_id = course.course_id;
        const [courses_info, course_fields] = await con.query(
          `SELECT price, discount FROM courses WHERE id=?`,
          [course_id],
        );
        await con.query(`INSERT INTO payments_courses SET ?`, {
          payment_id: res.insertId,
          course_id: course_id,
          price: courses_info[0].price,
          discounted: courses_info[0].discount,
        });
      }

      if (cart.length) {
        await con.commit();

        console.log("Created payment: ", {
          cart: cart,
          results: res,
        });
      } else {
        await con.rollback();

        console.log("Create payment failed: ", {
          cart: cart,
          results: res,
        });
      }
      sql.releaseConnection(con);

      return this.getInfoById(res.insertId);
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  // Find one payment by filter
  static findOne = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${Payment.queryFields} FROM payments WHERE ${filterKeys}`,
      filterValues,
    );
    if (rows.length) {
      console.log("Found payment: ", {
        filters: filters,
        results: rows[0],
      });
      return rows[0];
    } else {
      console.log("Found no payment: ", { filters: filters });
      return null;
    }
  };

  // Find all payments by filter
  static findAll = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${Payment.queryFields} FROM payments WHERE ${filterKeys}`,
      filterValues,
    );
    console.log("Found payments: ", { filters: filters, results: rows });
    return rows;
  };

  static getAll = async () => {
    const [rows, fields] = await sql.query(
      `SELECT ${Payment.queryFields} FROM payments`,
    );
    console.log("Get all payments: ", { results: rows });
    return rows;
  };
  static getInfoById = async (id) => {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();
      const [rows, fields] = await con.query(
        `SELECT ${Payment.queryFields} FROM payments WHERE id=?`,
        [id],
      );
      let info;
      if (rows.length) {
        console.log("Found payments: ", { id: id, results: rows[0] });
        const [courses, _] = await con.query(
          `SELECT course_id, price, discounted
          FROM payments_courses
          WHERE payment_id=?`,
          [id],
        );
        info = {
          ...rows[0],
          courses: courses,
        };
      } else {
        info = null;
      }
      await con.commit();
      sql.releaseConnection(con);
      return info;
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };
}
module.exports = Payment;
