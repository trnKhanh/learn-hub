const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");

class Learn_Courses {
    constructor(learn_course) {
        this.course_id = learn_course.course_id;
        this.student_id = learn_course.student_id;
    }

    static queryFields = `course_id, student_id, registered_at, finished_at`;

    static create = async (newLearn_Course) => {
        const con = await sql.getConnection();
        try {
            await con.beginTransaction();

            const [res, _] = await sql.query(
                `INSERT INTO learn_courses SET ?`,
                newLearn_Course,
            );

            const [rows, fields] = await sql.query(
                `SELECT ${Learn_Courses.queryFields} 
                FROM learn_courses 
                WHERE course_id=? and student_id=?`,
                [newLearn_Course.course_id, newLearn_Course.student_id],
            );

            await con.commit();
            sql.releaseConnection(con);

            console.log("Created learn_course: ", {
                newLearn_Course: rows[0],
                results: res,
            });
            return rows[0];
        }
        catch (err) {
            await con.rollback();
            sql.releaseConnection(con);

            throw err;
        }
    };

    static findOne = async (filters) => {
        const { filterKeys, filterValues } = formatFilters(filters);
        const [rows, fields] = await sql.query(
            `SELECT ${Learn_Courses.queryFields} 
            FROM learn_courses 
            WHERE ${filterKeys}`,
            filterValues,
        );

        if(rows.length) {
            console.log("Found learn_course: ", { filters: filters, results: rows[0] });
            return rows[0];
        }
        else {
            console.log("Found no learn_course: ", { filters: filters });
            return null;
        }
    };
};

module.exports = Learn_Courses;