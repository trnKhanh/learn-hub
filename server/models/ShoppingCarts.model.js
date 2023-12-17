const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");

// Constructor
class ShoppingCart {
  constructor(shoppingCart) {
    this.student_id = shoppingCart.student_id;
    this.course_id = shoppingCart.course_id;
  }
  static queryFields = `course_id`;

  // Create new ShoppingCart
  static addCourse = async (student_id, course_id) => {
    const con = await sql.getConnection();
    try {
      let newShoppingCart = new ShoppingCart({
        student_id: student_id,
        course_id: course_id,
      });
      await con.beginTransaction();
      const [res, _] = await con.query(
        `INSERT INTO shopping_carts SET ?`,
        newShoppingCart,
      );

      await con.commit();
      sql.releaseConnection(con);

      console.log("Created shopping cart: ", {
        newShoppingCart: newShoppingCart,
        results: res,
      });
      return newShoppingCart;
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  // Find one shopping_cart by filter
  static findOne = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${ShoppingCart.queryFields} FROM shopping_carts WHERE ${filterKeys}`,
      filterValues,
    );
    if (rows.length) {
      console.log("Found shopping cart: ", {
        filters: filters,
        results: rows[0],
      });
      return rows[0];
    } else {
      console.log("Found no shopping cart: ", { filters: filters });
      return null;
    }
  };

  // Find all shopping_carts by filter
  static findAll = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${ShoppingCart.queryFields} FROM shopping_carts WHERE ${filterKeys}`,
      filterValues,
    );
    console.log("Found shopping carts: ", { filters: filters, results: rows });
    return rows;
  };

  static getAll = async () => {
    const [rows, fields] = await sql.query(
      `SELECT ${ShoppingCart.queryFields} FROM shopping_carts`,
    );
    console.log("Get all shopping carts: ", { results: rows });
    return rows;
  };

  // Delete shopping_cart by filters
  static removeAllCourses = async (student_id) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [rows, fields] = await con.query(
        `SELECT ${ShoppingCart.queryFields} 
        FROM shopping_carts 
        WHERE student_id=?`,
        [student_id],
      );

      const [res, _] = await con.query(
        `DELETE FROM shopping_carts 
        WHERE student_id=?`,
        [student_id],
      );

      console.log("Deleted shopping carts", {
        student_id: student_id,
        results: res,
      });

      con.commit();
      sql.releaseConnection(con);

      return rows;
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  static removeCourse = async (student_id, course_id) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [rows, fields] = await con.query(
        `SELECT ${ShoppingCart.queryFields} 
        FROM shopping_carts 
        WHERE student_id=? AND course_id=?`,
        [student_id, course_id],
      );

      const [res, _] = await con.query(
        `DELETE FROM shopping_carts 
        WHERE student_id=? AND course_id=?`,
        [student_id, course_id],
      );

      console.log("Deleted shopping carts", {
        student_id: student_id,
        course_id: course_id,
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
module.exports = ShoppingCart;
