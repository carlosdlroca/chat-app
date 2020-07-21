const jwt = require("jsonwebtoken");
const { User, Chatroom } = require("../models");

const ERROR_MESSAGE = {
    status: 401,
    message: "You cannot do that!",
};

exports.ensureUserOwnsChatroom = async function (req, res, next) {
    try {
        if (!req.user) {
            return next(ERROR_MESSAGE);
        }

        const { id: user_id } = req.user;
        const user = await User.findById(id);
        const userOwnsChatroom = user.chatrooms_joined.some(
            (chatroom_id) => chatroom_id === user_id
        );
        if (userOwnsChatroom) {
            return next();
        }
        return next(ERROR_MESSAGE);
    } catch (err) {
        return next(ERROR_MESSAGE);
    }
};
