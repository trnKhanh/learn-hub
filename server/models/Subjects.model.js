const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");

class Subject {
    constructor(subject) {
        this.name = subject.name;
    }

    static queryFields = `id, name`;

    static create = async (newSubject) => {
        const con = await sql.getConnection();
        try {
            await con.beginTransaction();

            const [res, _] = await sql.query(
                `INSERT INTO subjects SET ?`,
                newSubject,
            );

            const [rows, fields] = await sql.query(
                `SELECT ${Subject.queryFields} 
                FROM subjects 
                WHERE name=?`,
                [newSubject.name],
            );

            await con.commit();
            sql.releaseConnection(con);

            console.log("Created subject: ", {
                newSubject: rows[0],
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

    static findAll = async () => {
        const [rows, fields] = await sql.query(
            `SELECT ${Subject.queryFields} FROM subjects`,
        );
        console.log("Get all courses: ", { results: rows });
        return rows;
    };

    static getSubjectsOfCourse = async (courseId) => {
        const [rows, fields] = await sql.query(
            `SELECT ${Subject.queryFields} 
            FROM courses_subjects c, subjects s 
            WHERE c.subject_id = s.id and c.course_id=?`,
            [courseId],
        );

        if(rows.length) {
            console.log("Found subjects: ", { courseId: courseId, results: rows });
            return rows;
        }
        else {
            console.log("Found no subjects: ", { courseId: courseId });
            return null;
        }
    };

    static findById = async (filters) => {
        const { filterKeys, filterValues } = formatFilters(filters);
        
        const [rows, fields] = await sql.query(
            `SELECT ${Subject.queryFields} 
            FROM subjects 
            WHERE ${filterKeys}`,
            filterValues,
        );

        if(rows.length) {
            console.log("Found subject: ", { filters: filters, results: rows[0] });
            return rows[0];
        }
        else {
            console.log("Found no subject: ", { filters: filters });
            return null;
        }
    }

    static updateById = async (id, columns) => {
        const con = await sql.getConnection();

        try {
            await con.beginTransaction();
            
            const [res, _] = await sql.query(
                `UPDATE subjects SET ?
                WHERE id=?`,
                [columns, id],
            );

            const [rows, fields] = await sql.query(
                `SELECT ${Subject.queryFields}
                FROM subjects
                WHERE id=?`,
                [id],
            );

            console.log("Updated subject by Id", {
                id: id,
                columns: columns,
                results: res,
            });

            await con.commit();
            sql.releaseConnection(con);
            if(res.affectedRows == 0) return null;
            else return rows;
        }
        catch(err) {
            await con.rollback();
            sql.releaseConnection(con);

            throw err;
        }
    };

    static deleteById = async (id) => {
        const con = await sql.getConnection();

        try {
            await con.beginTransaction();
            const [rows, fields] = await con.query(
                `SELECT ${Subject.queryFields}
                FROM subjects
                WHERE id=?`,
                [id],
            );

            const [res, _] = await con.query(
                `DELETE FROM subjects
                WHERE id=?`,
                [id],
            );
                
            console.log("Deleted subject by Id", {
                id: id,
                results: res,
            });

            con.commit();
            sql.releaseConnection(con);

            if(res.affectedRows == 0) return null;
            else return rows;
        }
        catch(err) {
            await con.rollback();
            sql.releaseConnection(con);

            throw err;
        }
    };
};

module.exports = Subject;