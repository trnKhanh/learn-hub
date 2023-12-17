const sql = require("../database/db");
const { formatFilters } = require("../utils/query.utils");

class Notification {
    constructor(notification) {
        this.user_id = notification.user_id || null;
        this.notified_at = notified_at || null;
        this.content = content | null;
    }

    static queryFields = `user_id, notified_at, content`

    static create = async (newNotification) => {
        const con = await sql.getConnection();

        try {
            await con.beginTransaction();

            const [res, _] = await con.query(
                `INSERT INTO notifications SET ?`,
                newNotification,
            );

            const [row, fields] = await con.query(
                `SELECT ${Notification.queryFields}
                FROM notifications NATURAL JOIN users
                WHERE users.id=? AND notified_at=?`
                [newNotification.user_id , newNotification.notified_at],
            );

            await con.commit();
            sql.releaseConnection(con);

            console.log("Created notification: ", {
                newNotification: row[0],
                result: res,
            });
            return row[0];
        }
        catch (err) {
            await con.rollback();
            sql.releaseConnection(con);

            throw err;
        }
    };

    static findNotificationByUserId = async (filters) => {
        const {filterKeys, filterValues} = formatFilters(filters); //vi du o day co nhieu hon 1 truong du lieu thi sao?
        const [row , fields] = await sql.query(
            `SELECT ${Notification.user_id}
            FROM notifications NATURAL JOIN users
            WHERE ${filterKeys}`,
            filterValues,
        );

        if(row.length) {
            console.log("Found notification of user'id: ", {filters: filters, results: rows[0]});
            return row[0];
        }
        else {
            console.log("Found no notification of user'id: ", {filters: filters});
            return null;
        }
    };

    static findNotificationByUserIdTime = async (filters) => {
        const {filterKeys, filterValues} = formatFilters(filters); //vi du o day co nhieu hon 1 truong du lieu thi sao?
        const [row , fields] = await sql.query(
            `SELECT ${Notification.user_id}
            FROM notifications NATURAL JOIN users
            WHERE ${filterKeys}`,
            filterValues,
        );

        if(row.length) {
            console.log("Found notification of user'id with time created: ", {filters: filters, results: rows[0]});
            return row[0];
        }
        else {
            console.log("Found no notification of user'id with time created: ", {filters: filters});
            return null;
        }
    };
}