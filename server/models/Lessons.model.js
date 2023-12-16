const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");

class Lesson {
    constructor(lesson) {
        this.name = lesson.name;
        this.id = lesson.id;
        this.course_id = lesson.course_id;
        this.isPublished = lesson.isPublished;
        this.isFree = lesson.isFree;
    }
    static queryFields = `id, name, course_id, isPublished, isFree`;

    static getAll = async (course_id) => {
        const [rows, fields] = await sql.query(
            `SELECT ${Lesson.queryFields} FROM lessons WHERE course_id=?`,
            [course_id],
        );
        return rows;
    };

    /*static create = async (newLesson) => {
        const con = await sql.getConnection();
        try {
            await con.beginTransaction();
            const [res, _] = await con.query(`INSERT INTO lessons SET ?`, newLesson);
            const [rows, fields] = await con.query(
                `SELECT ${Lesson.queryFields} FROM lessons WHERE id=?`,
                res.insertId,
            );

            await con.commit();
            sql.releaseConnection(con);

            //console.log("Created lesson: ", { newLesson: rows[0], results: res });
            return rows[0];
        } catch (err) {
            await con.rollback();
            sql.releaseConnection(con);
            throw err;
        }
    };*/

    /*static findOne = async (filters) => {
        const { filterKeys, filterValues } = formatFilters(filters);
        const [rows, fields] = await sql.query(
            `SELECT ${Lesson.queryFields} FROM lessons WHERE ${filterKeys}`,
            filterValues,
        );
        if (rows.length) {
            console.log("Found lesson: ", { filters: filters, results: rows[0] });
            return rows[0];
        } else {
            console.log("Found no lesson: ", { filters: filters });
            return null;
        }
    };

    static findAll = async (filters) => {
        const { filterKeys, filterValues } = formatFilters(filters);
        const [rows, fields] = await sql.query(
            `SELECT ${Lesson.queryFields} FROM lessons WHERE ${filterKeys}`,
            filterValues,
        );
        if (rows.length) {
            console.log("Found lesson: ", { filters: filters, results: rows[0] });
            return rows;
        } else {
            console.log("Found no lesson: ", { filters: filters });
            return null;
        }
    };*/
}

module.exports = Lesson;