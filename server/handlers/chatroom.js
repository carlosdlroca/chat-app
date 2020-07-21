const { Chatroom } = require("../models");

// COMPLETE
exports.getChatrooms = async function (req, res, next) {
    try {
        const chatrooms = await Chatroom.find({});
        return res.status(200).json({ chatrooms });
    } catch (err) {
        return next({
            status: 404,
            message: "Could not find chatrooms",
        });
    }
};

// COMPLETE
exports.createChatroom = async function (req, res, next) {
    try {
        const currentUser = req.user;
        const { name } = req.body;
        let chatroom = await Chatroom.create({
            name,
            owner: currentUser.id,
            users: [currentUser.id],
        });
        return res.status(200).json({ chatroom });
    } catch (err) {
        return next({
            status: 403,
            message: "Could not create chatroom",
        });
    }
};

// COMPLETE
exports.getChatroom = async function (req, res, next) {
    try {
        const chatroom_id = req.params.id;
        const chatroom = await Chatroom.findById(chatroom_id);
        return res.status(200).json({ chatroom });
    } catch (err) {
        return next({
            status: 401,
            message: "Could not find the chatroom.",
        });
    }
};

// COMPLETE
exports.deleteChatroom = async function (req, res, next) {
    try {
        const chatroom_id = req.params.id;
        await Chatroom.deleteOne({ id: chatroom_id });
        return res.status(200).json({ chatroom_id });
    } catch (errr) {
        return next(err);
    }
};

exports.joinChatroom = async function (req, res, next) {
    try {
        const chatroom_id = req.params.id;
        const chatroom = await Chatroom.findById(chatroom_id);

        const user_id = req.user.id;
        await chatroom.addUser(user_id);

        return res.status(200).json({ chatroom });
    } catch (err) {
        return next(err);
    }
};

exports.updateChatroom = async function (req, res, next) {
    try {
    } catch (errr) {
        return next(err);
    }
};
