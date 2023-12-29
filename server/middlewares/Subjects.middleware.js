const Admin = require("../models/Admins.model");

const validateSubjectsAccessPermission = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({
            id: req.user.id,
        });
        if (!admin) {
            res.status(401).json({
                message: "No permission to access subjects",
            });
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Errors occur when validating update subject permission",
        });
    }
};

module.exports = { validateSubjectsAccessPermission };