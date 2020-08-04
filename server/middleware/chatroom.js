const { User } = require("../models");

const ERROR_MESSAGE = {
    status: 401,
    message: "You cannot do that!",
};

exports.ensureUserOwnsChatroom = async function (req, res, next) {
    try {
        if (!req.user) {
            return next(ERROR_MESSAGE);
        }
        const user = await User.findById(req.user.id);
        const userOwnsChatroom = user.chatrooms_owned.includes(req.params.id);
        if (userOwnsChatroom) {
            return next();
        }
        return next(ERROR_MESSAGE);
    } catch (err) {
        return next(ERROR_MESSAGE);
    }
};
