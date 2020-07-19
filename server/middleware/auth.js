require("dotenv").config({ path: "../../.env" });
const jwt = require("jsonwebtoken");
const { User } = require("../models");

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

exports.ensureUserIsAdmin = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, async function (
            err,
            decoded
        ) {
            if (decoded) {
                const user = await User.findById(decoded.id);
                if (user.isAdmin) {
                    next();
                } else {
                    return next({
                        status: 403,
                        message: "You are not an admin",
                    });
                }
            } else {
                return next({
                    status: 403,
                    message: "You can't do that",
                });
            }
        });
    } catch (err) {
        return next({
            status: 403,
            message: "You can't do that!",
        });
    }
};
