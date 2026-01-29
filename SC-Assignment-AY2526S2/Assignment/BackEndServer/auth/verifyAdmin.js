// middleware/verifyAdmin.js

function verifyAdmin(req, res, next) {
    if (!req.type) {
        return res.status(403).json({
            auth: false,
            message: "Role not found"
        });
    }

    if (req.type !== "Admin") {
        return res.status(403).json({
            auth: false,
            message: "Admin access required"
        });
    }

    // user is admin
    next();
}

module.exports = verifyAdmin;
