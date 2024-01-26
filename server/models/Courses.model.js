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
    this.isPublished = course.isPublished || 0;
  }
  static queryFields = `id, name, description, difficulty, duration, owner_id, price, profile_picture, discount, isPublished`;

  // Create new Course
  static create = async (newCourse) => {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();
      const [res, _] = await con.query(`INSERT INTO courses SET ?`, newCourse);
      const [rows, fields] = await con.query(
        `SELECT ${Course.queryFields} FROM courses WHERE id=?`,
        res.insertId,
      );

      await con.commit();
      sql.releaseConnection(con);

      console.log("Created course: ", { newCourse: rows[0], results: res });
      return rows[0];
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  // Find one course by filter
  static findOne = async (filters) => {
    const con = await sql.getConnection();
    try {
      const { filterKeys, filterValues } = formatFilters(filters);
      const [rows, fields] = await con.query(
        `SELECT ${Course.queryFields}, COUNT(student_id) AS number_of_students
        FROM courses LEFT JOIN learn_courses ON id=course_id
        WHERE ${filterKeys}
        GROUP BY ${Course.queryFields}`,
        filterValues,
      );
      let course;

      if (rows.length) {
        course = rows[0];
      } else {
        await con.rollback();
        sql.releaseConnection(con);
        console.log("Found no course: ", { filters: filters });
        return null;
      }

      let [languages, languages_fields] = await con.query(
        `SELECT language_name 
          FROM languages JOIN courses_languages ON languages.id=language_id
          WHERE course_id=?`,
        [course.id],
      );
      let [subjects, subjects_fields] = await con.query(
        `SELECT subjects.name 
          FROM subjects JOIN courses_subjects ON subjects.id=subject_id
          WHERE course_id=?`,
        [course.id],
      );
      languages = languages.map((row) => row.language_name);
      subjects = subjects.map((row) => row.name);

      course = {
        languages: languages,
        subjects: subjects,
        ...course,
      };

      await con.commit();
      sql.releaseConnection(con);
      console.log("Found course: ", { filters: filters, course: course });

      return course;
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  // Find all courses by filter
  static findAll = async (filters) => {
    const con = await sql.getConnection();
    try {
      const { filterKeys, filterValues } = formatFilters(filters);
      let [rows, fields] = await con.query(
        `SELECT ${Course.queryFields}, COUNT(student_id) AS number_of_students
        FROM courses LEFT JOIN learn_courses ON id=course_id
        WHERE ${filterKeys}
        GROUP BY ${Course.queryFields}`,
        filterValues,
      );
      rows = rows.map(async (course) => {
        const [languages, languages_fields] = await con.query(
          `SELECT language_name 
          FROM languages JOIN courses_languages ON languages.id=language_id
          WHERE course_id=?`,
          [course.id],
        );
        const [subjects, subjects_fields] = await con.query(
          `SELECT subjects.name 
          FROM subjects JOIN courses_subjects ON subjects.id=subject_id
          WHERE course_id=?`,
          [course.id],
        );
        languages.map((row) => row.language_name);
        subjects.map((row) => row.name);

        return {
          languages: languages,
          subjects: subjects,
          ...course,
        };
      });

      await con.commit();
      sql.releaseConnection(con);
      console.log("Found courses: ", { filters: filters, results: rows });
      return rows;
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      throw err;
    }
  };

  static getAll = async () => {
    const [rows, fields] = await sql.query(
      `SELECT ${Course.queryFields} FROM courses`,
    );
    console.log("Get all courses: ", { results: rows });
    return rows;
  };

  static getByStudentId = async (student_id) => {
    const [rows, fields] = await sql.query(
      `SELECT ${Course.queryFields} FROM courses JOIN learn_courses 
      ON id=course_id
      WHERE student_id=?`,
      [student_id],
    );
    console.log("Get all courses by student id: ", {
      student_id: student_id,
      results: rows,
    });
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
        [id],
      );

      console.log("Updated courses", {
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

  // Delete course by filters
  static deleteById = async (id) => {
    const con = await sql.getConnection();

    try {
      await con.beginTransaction();
      const [rows, fields] = await con.query(
        `SELECT ${Course.queryFields} FROM courses WHERE id=?`,
        [id],
      );

      const [res, _] = await con.query(`DELETE FROM courses WHERE id=?`, [id]);

      console.log("Deleted courses", {
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

  static isPaid = async (student_id, id) => {
    const [res, _] = await sql.query(
      `SELECT * FROM payments JOIN payments_courses ON id=payment_id
      WHERE student_id=? AND course_id=?`,
      [student_id, id],
    );
    console.log("Check is paid status", {
      results: res,
    });
    if (!res.length) return 0;
    else return 1;
  };

  static register = async (student_id, id) => {
    const [res, _] = await sql.query(`INSERT INTO learn_courses SET ?`, {
      student_id: student_id,
      course_id: id,
    });
  };

  static getProgess = async (student_id, id) => {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();
      const [isRegisted, _] = await con.query(
        `SELECT *
        FROM learn_courses
        WHERE course_id=? AND student_id=?`,
        [id, student_id],
      );

      if (isRegisted.length == 0) {
        await con.rollback();
        sql.releaseConnection(con);
        return null;
      }
      const [res, fields] = await con.query(
        `SELECT COUNT(DISTINCT lessons.id) AS lessons_num, COUNT(DISTINCT learn_lessons.lesson_id) AS finished_lessons_num
        FROM lessons LEFT JOIN learn_lessons 
          ON lessons.course_id = learn_lessons.course_id
            AND lessons.id = learn_lessons.lesson_id
            AND learn_lessons.student_id=? 
            AND lessons.course_id=? 
            AND learn_lessons.finished_at IS NOT NULL`,
        [student_id, id],
      );
      let progress = 1;
      if (res.lessons_num != 0) {
        progress = res[0].finished_lessons_num / res[0].lessons_num;
      }

      if (progress == 1) {
        const [res, _] = await con.query(
          `UPDATE learn_courses 
          SET finished_at=CURRENT_TIMESTAMP
          WHERE course_id=? AND student_id=?`,
          [id, student_id],
        );
      }

      const [rows, lessons_field] = await con.query(
        `SELECT lessons.*, finished_at
        FROM lessons LEFT JOIN learn_lessons 
          ON lessons.course_id=learn_lessons.course_id 
            AND lessons.id=learn_lessons.lesson_id
            AND lessons.course_id=? 
            AND learn_lessons.student_id=?
        WHERE lessons.course_id=?`,
        [id, student_id, id],
      );

      console.log("Found course's progress: ", {
        student_id: student_id,
        course_id: id,
        results: { progress: progress, lessons: rows },
      });

      await con.commit();
      sql.releaseConnection(con);

      return { progress: progress, lessons: rows };
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
    conditions.push(`isPublished=?`);
    values.push(true);
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
