const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");

// Constructor
class Course {
  constructor(course) {
    this.name = course.name;
    this.description = course.description;
    this.difficulty = course.difficulty;
    this.duration = course.duration;
    this.owner_id = course.owner_id;
    this.price = course.price;
    this.profile_picture = course.profile_picture;
    this.discount = course.discount;
  }
  static queryFields = `courses.id as id, name, description, difficulty, duration, owner_id, price, profile_picture, discount`;

  // Create new Course
  static create = async (newCourse) => {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();
      const [res, _] = await con.query(`INSERT INTO courses SET ?`, newCourse);
      const [rows, fields] = await con.query(
        `SELECT ${Course.queryFields} FROM courses WHERE id=?`,
        res.insertId
      );

      await con.commit();
      sql.releaseConnection(con);

      // console.log("Created course: ", { newCourse: rows[0], results: res });
      return rows[0];
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  // Find one course by filter
  static findOne = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${Course.queryFields} FROM courses WHERE ${filterKeys}`,
      filterValues
    );
    if (rows.length) {
      // console.log("Found course: ", { filters: filters, results: rows[0] });
      return rows[0];
    } else {
      // console.log("Found no course: ", { filters: filters });
      return null;
    }
  };

  // Find all courses by filter
  static findAll = async (filters) => {
    const { filterKeys, filterValues } = formatFilters(filters);
    const [rows, fields] = await sql.query(
      `SELECT ${Course.queryFields} FROM courses WHERE ${filterKeys}`,
      filterValues
    );
    // console.log("Found courses: ", { filters: filters, results: rows });
    return rows;
  };

  static getAll = async () => {
    const [rows, fields] = await sql.query(
      `SELECT ${Course.queryFields} FROM courses`
    );
    // console.log("Get all courses: ", { results: rows });
    return rows;
  };

  // Update course by filters
  static updateById = async (id, columns) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [res, _] = await con.query(`UPDATE courses SET ? WHERE id=?`, [
        columns,
        id,
      ]);
      const [rows, fields] = await con.query(
        `SELECT ${Course.queryFields} FROM courses WHERE id=?`,
        [id]
      );

      // console.log("Updated courses", {
      //   id: id,
      //   columns: columns,
      //   results: res,
      // });

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

  // Delete course by filters
  static deleteById = async (id) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [rows, fields] = await con.query(
        `SELECT ${Course.queryFields} FROM courses WHERE id=?`,
        [id]
      );

      const [res, _] = await con.query(`DELETE FROM courses WHERE id=?`, [id]);

      // console.log("Deleted courses", {
      //   id: id,
      //   results: res,
      // });

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

  static isPaid = async (student_id, id) => {
    const [res, _] = await con.query(
      `SELECT * FROM payments JOIN payments_courses ON id=payment_id
      WHERE student_id=? AND course_id=?`,
      [student_id, id]
    );
    // console.log("Check is paid status", {
    //   results: res,
    // });
    if (!res.length) return 0;
    else return 1;
  };

  static register = async (student_id, id) => {
    const [res, _] = await con.query(`INSERT INTO learn_courses SET ?`, {
      student_id: student_id,
      course_id: id,
    });
  };

  static getProgess = async (student_id, id) => {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();
      let [rows, _] = await con.query(
        `SELECT finished_at FROM learn_courses WHERE student_id=? AND course_id=?`,
        [student_id, id]
      );

      if (rows.length && !rows[0].finished_at) {
        const [notDoneExams, fields] = await con.query(
          `(SELECT id, lesson_id 
            FROM exams
            WHERE course_id=?)
           EXCEPT
           (SELECT exam_id, lesson_id
            FROM do_exams
            WHERE course_id=? AND student_id=? AND score>=5)`,
          [id, id, student_id]
        );

        if (!notDoneExams.length) {
          const [res, _] = await con.query(
            `UPDATE learn_courses 
            SET finished_at=CURRENT_TIMESTAMP
            WHERE course_id=? AND student_id=?`,
            [id, student_id]
          );
        }
        [rows, _] = await con.query(
          `SELECT finished_at FROM learn_courses WHERE student_id=? AND course_id=?`,
          [student_id, id]
        );
      }

      await con.commit();
      sql.releaseConnection(con);
      if (rows.length) {
        return rows[0];
      } else {
        return null;
      }
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);
      throw err;
    }
  };

  static search = async (filters) => {
    let conditions = [];
    let values = [];
    if (filters.priceMin != undefined) {
      conditions.push(`courses.price>=?`);
      values.push(filters.priceMin);
    }
    if (filters.priceMax != undefined) {
      conditions.push(`courses.price<=?`);
      values.push(filters.priceMax);
    }
    if (filters.name) {
      conditions.push(`courses.name LIKE ?`);
      values.push("%" + filters.name + "%");
    }
    if (filters.difficulties) {
      conditions.push(`courses.difficulty IN (?)`);
      values.push(filters.difficulties);
    }
    if (filters.subjects) {
      conditions.push(`subject_id IN (?)`);
      values.push(filters.subjects);
    }
    if (filters.languages) {
      conditions.push(`language_id IN (?)`);
      values.push(filters.languages);
    }
    const sqlCondition = conditions.join(" AND ");
    const [rows, fields] = await sql.query(
      `SELECT DISTINCT ${Course.queryFields} 
      FROM ((courses LEFT JOIN courses_subjects ON courses.id=courses_subjects.course_id)
            LEFT JOIN courses_languages ON courses.id=courses_languages.course_id)
      ${sqlCondition.length ? "WHERE" : ""} ${sqlCondition}`,
      values,
    );
    console.log("Found courses: ", { filters: filters, results: rows });
    return rows;
  };
}
module.exports = Course;
