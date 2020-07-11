const { User } = require("../models");
const jwt = require("jsonwebtoken");

const invalidError = {
    status: 400,
    message: "Invalid Username/Password",
};

exports.signin = async function signinHandler(req, res, next) {
    try {
        let user = await User.findOne({
            username: req.body.username,
        });
        let { id, username } = user;

        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign(
                {
                    id,
                    username,
                },
                process.env.JWT_SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                token,
            });
        } else {
            return next(invalidError);
        }
    } catch (err) {
        return next(invalidError);
    }
};

exports.signup = async function signupHandler(req, res, next) {
    try {
        let user = await User.create(req.body);
        let { id, username } = user;
        let token = jwt.sign(
            {
                id,
                username,
            },
            process.env.JWT_SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            token,
        });
    } catch (err) {
        if (err.code === 11000) {
            err.message = "Sorry, that username is taken.";
        }
        return next({
            status: 400,
            message: err.message,
        });
    }
};
