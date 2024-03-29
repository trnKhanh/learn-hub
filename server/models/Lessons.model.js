// const sql = require("../database/db.js");
// const LessonManager = require("./LessonManager.model.js");
// const { formatFilters } = require("../utils/query.utils.js");

// class Lesson {
//   constructor(lesson) {
//     this.id = lesson.id || null;
//     this.name = lesson.name || null;
//     this.course_id = lesson.course_id || null;
//     this.isFree =
//       lesson.isFree == true || lesson.isFree == "true" ? true : false;
//     this.isPublished =
//       lesson.isPublished == true || lesson.isPublished == "true" ? true : false;

//     this.basic_filters = {
//       course_id: this.course_id,
//     };
//     this.videoUrl = lesson.videoUrl;
//   }

//   getFiltersAfterFormat(filters = {}) {
//     filters = { ...this.basic_filters, ...filters };
//     return formatFilters(filters);
//   }

//   async findAll(filters = {}) {
//     const { filterKeys, filterValues } = this.getFiltersAfterFormat(filters);
//     const [rows, fields] = await sql.query(
//       `SELECT * FROM lessons WHERE ${filterKeys}`,
//       filterValues,
//     );
//     console.log(rows);
//     return rows;
//   }

//   async getId() {
//     if (this.id) return this;

//     const { filterKeys, filterValues } = formatFilters(this.basic_filters);

//     // find the max id in table
//     const [rows, fields] = await sql.query(
//       `SELECT MAX(id) max_id FROM lessons WHERE ${filterKeys}`,
//       filterValues,
//     );

//     if (!rows[0].max_id) rows[0].max_id = 0;
//     this.id = rows[0].max_id + 1;

//     return this;
//   }

//   async create() {
//     const con = await sql.getConnection();
//     try {
//       await con.beginTransaction();

//       await this.getId();

//       // console.log(">>> LessonManager >> create >> newLesson: ", this);

//       const [res, _] = await con.query(`INSERT INTO lessons SET ?`, this);

//       const filter = this.basic_filters;
//       filter.id = this.id;
//       const { filterKeys, filterValues } = formatFilters(filter);

//       const [rows, fields] = await con.query(
//         `SELECT * FROM lessons WHERE ${filterKeys}`,
//         filterValues,
//       );

//       await con.commit();
//       sql.releaseConnection(con);

//       if (res.affectedRows == 0) return null;
//       console.log("Created lesson: ", { newLesson: rows[0], results: res });
//       return rows[0];
//     } catch (err) {
//       await con.rollback();
//       sql.releaseConnection(con);

//       console.log(err);
//       throw err;
//     }
//   }
//   // async isExist() {
//   //   const filters = {
//   //     name: this.name,
//   //     course_id: this.course_id,
//   //   };

//   //   try {
//   //     const { filterKeys, filterValues } = formatFilters(filters);
//   //     const [rows, fields] = await sql.query(
//   //       `SELECT * FROM lessons WHERE ${filterKeys}`,
//   //       filterValues
//   //     );

//   //     if (rows.length) {
//   //       console.log(" >>> Lessons.models > isExist > Found lesson: ", {
//   //         lesson: this,
//   //       });
//   //       return true;
//   //     } else {
//   //       // console.log("Found no lesson: ", { lesson: this });
//   //       return false;
//   //     }
//   //   } catch (err) {
//   //     console.log(err);
//   //     throw err;
//   //   }
//   // }

//   async findOne(filters) {
//     try {
//       const { filterKeys, filterValues } = this.getFiltersAfterFormat(filters);
//       const [rows, fields] = await sql.query(
//         `SELECT * FROM lessons WHERE ${filterKeys}`,
//         filterValues,
//       );

//       if (rows.length) return rows[0];
//       else return null;
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }

//   async updateById(newData) {
//     const con = await sql.getConnection();
//     try {
//       await con.beginTransaction();

//       const filters = this.basic_filters;
//       filters.id = this.id;

//       const { filterKeys, filterValues } = formatFilters(filters);

//       const [res, _] = await con.query(
//         `UPDATE lessons SET ? WHERE ${filterKeys}`,
//         [newData, ...filterValues],
//       );
//       const [rows, fields] = await con.query(
//         `SELECT * FROM lessons WHERE ${filterKeys}`,
//         filterValues,
//       );

//       await con.commit();
//       sql.releaseConnection(con);

//       if (res.affectedRows == 0) return null;
//       // console.log("Updated lesson: ", { newLesson: rows[0], results: res });
//       return rows[0];
//     } catch (err) {
//       await con.rollback();
//       sql.releaseConnection(con);

//       console.log(err);
//       throw err;
//     }
//   }

//   async deleteById() {
//     const filters = this.basic_filters;
//     filters.id = this.id;
//     const { filterKeys, filterValues } = formatFilters(filters);

//     const con = await sql.getConnection();
//     try {
//       await con.beginTransaction();

//       const [rows, fields] = await con.query(
//         `SELECT * FROM lessons WHERE ${filterKeys}`,
//         filterValues,
//       );

//       const [res, _] = await con.query(
//         `DELETE FROM lessons WHERE ${filterKeys}`,
//         filterValues,
//       );

//       await con.commit();
//       sql.releaseConnection(con);

//       if (res.affectedRows == 0) return null;
//       else return rows[0];
//     } catch (error) {
//       await con.rollback();
//       sql.releaseConnection(con);

//       console.log(error);
//       throw error;
//     }
//   }
//   // static canAccess = async (student_id, lesson_id) => {
//   //   const [res, _] = await sql.query(
//   //     `SELECT *
//   //     FROM (learn_courses JOIN lessons ON learn_courses.course_id=lessons.course_id) 
//   //     WHERE learn_courses.student_id=? AND lessons.id=?
//   //       AND(lessons.isFree=1 OR EXISTS(
//   //         SELECT * 
//   //         FROM payments
//   //         WHERE payments.student_id=learn_courses.student_id
//   //           AND payments.course_id=learn_courses.course_id))`,
//   //     [student_id, lesson_id],
//   //   );
//   //   if (res.length) {
//   //     return true;
//   //   } else {
//   //     return false;
//   //   }
//   // };
// }

// module.exports = Lesson;

const sql = require("../database/db.js");
const LessonManager = require("./LessonManager.model.js");
const { formatFilters } = require("../utils/query.utils.js");

class Lesson {
  constructor(lesson) {
    this.id = lesson.id || null;
    this.name = lesson.name || null;
    this.course_id = lesson.course_id || null;
    this.isFree =
      lesson.isFree == true || lesson.isFree == "true" ? true : false;
    this.isPublished =
      lesson.isPublished == true || lesson.isPublished == "true" ? true : false;

    this.basic_filters = {
      course_id: this.course_id,
    };
    this.videoUrl = lesson.videoUrl | "Đây là link video";
  }

  getFiltersAfterFormat(filters = {}) {
    filters = { ...this.basic_filters, ...filters };
    return formatFilters(filters);
  }

  async findAll(filters = {}) {
    const { filterKeys, filterValues } = this.getFiltersAfterFormat(filters);
    const [rows, fields] = await sql.query(
      `SELECT * FROM lessons WHERE ${filterKeys}`,
      filterValues
    );
    console.log(rows);
    return rows;
  }

  async getId() {
    if (this.id) return this;

    const { filterKeys, filterValues } = formatFilters(this.basic_filters);

    // find the max id in table
    const [rows, fields] = await sql.query(
      `SELECT MAX(id) max_id FROM lessons WHERE ${filterKeys}`,
      filterValues
    );

    if (!rows[0].max_id) rows[0].max_id = 0;
    this.id = rows[0].max_id + 1;

    return this;
  }

  async create() {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();

      await this.getId();

      let newLesson = { ...this };
      delete newLesson.basic_filters;
      // console.log(">>> LessonManager >> create >> newLesson: ", this);

      const [res, _] = await con.query(`INSERT INTO lessons SET ?`, newLesson);

      const filter = this.basic_filters;
      filter.id = this.id;
      const { filterKeys, filterValues } = formatFilters(filter);

      const [rows, fields] = await con.query(
        `SELECT * FROM lessons WHERE ${filterKeys}`,
        filterValues
      );

      await con.commit();
      sql.releaseConnection(con);

      if (res.affectedRows == 0) return null;
      console.log("Created lesson: ", { newLesson: rows[0], results: res });
      return rows[0];
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      console.log(err);
      throw err;
    }
  }
  // async isExist() {
  //   const filters = {
  //     name: this.name,
  //     course_id: this.course_id,
  //   };

  //   try {
  //     const { filterKeys, filterValues } = formatFilters(filters);
  //     const [rows, fields] = await sql.query(
  //       `SELECT * FROM lessons WHERE ${filterKeys}`,
  //       filterValues
  //     );

  //     if (rows.length) {
  //       console.log(" >>> Lessons.models > isExist > Found lesson: ", {
  //         lesson: this,
  //       });
  //       return true;
  //     } else {
  //       // console.log("Found no lesson: ", { lesson: this });
  //       return false;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // }

  async findOne(filters) {
    try {
      const { filterKeys, filterValues } = this.getFiltersAfterFormat(filters);
      const [rows, fields] = await sql.query(
        `SELECT * FROM lessons WHERE ${filterKeys}`,
        filterValues
      );

      if (rows.length) return rows[0];
      else return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateById(newData) {
    const con = await sql.getConnection();
    try {
      await con.beginTransaction();

      const filters = this.basic_filters;
      filters.id = this.id;

      const { filterKeys, filterValues } = formatFilters(filters);

      const [res, _] = await con.query(
        `UPDATE lessons SET ? WHERE ${filterKeys}`,
        [newData, ...filterValues]
      );
      const [rows, fields] = await con.query(
        `SELECT * FROM lessons WHERE ${filterKeys}`,
        filterValues
      );

      await con.commit();
      sql.releaseConnection(con);

      if (res.affectedRows == 0) return null;
      // console.log("Updated lesson: ", { newLesson: rows[0], results: res });
      return rows[0];
    } catch (err) {
      await con.rollback();
      sql.releaseConnection(con);

      console.log(err);
      throw err;
    }
  }

  async deleteById() {
    const filters = this.basic_filters;
    filters.id = this.id;
    const { filterKeys, filterValues } = formatFilters(filters);

    const con = await sql.getConnection();
    try {
      await con.beginTransaction();

      const [rows, fields] = await con.query(
        `SELECT * FROM lessons WHERE ${filterKeys}`,
        filterValues
      );

      const [res, _] = await con.query(
        `DELETE FROM lessons WHERE ${filterKeys}`,
        filterValues
      );

      await con.commit();
      sql.releaseConnection(con);

      if (res.affectedRows == 0) return null;
      else return rows[0];
    } catch (error) {
      await con.rollback();
      sql.releaseConnection(con);

      console.log(error);
      throw error;
    }
  }
  // static canAccess = async (student_id, lesson_id) => {
  //   const [res, _] = await sql.query(
  //     `SELECT *
  //     FROM (learn_courses JOIN lessons ON learn_courses.course_id=lessons.course_id)
  //     WHERE learn_courses.student_id=? AND lessons.id=?
  //       AND(lessons.isFree=1 OR EXISTS(
  //         SELECT *
  //         FROM payments
  //         WHERE payments.student_id=learn_courses.student_id
  //           AND payments.course_id=learn_courses.course_id))`,
  //     [student_id, lesson_id],
  //   );
  //   if (res.length) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
}

module.exports = Lesson;


