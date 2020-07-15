require("dotenv").load({ path: "../../.env" });
const jwt = require("jsonwebtoken");

exports.loginRequired = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
            if (decoded) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "You need to log in first!",
                });
            }
        });
    } catch (err) {
        return next({
            status: 401,
            message: "You need to log in first",
        });
    }
};

exports.ensureCorrectUser = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
            if (decoded && decoded.id === req.params.id) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "You can't do that!",
                });
            }
        });
    } catch (err) {
        return next({
            status: 401,
            message: "You can't do that!",
        });
    }
};
