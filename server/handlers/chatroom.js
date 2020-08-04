const { Chatroom, User, Message } = require("../models");

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
        const chatroom = await Chatroom.create({
            name: req.body.name,
            owner: req.user.id,
            users: [req.user.id],
        });
        // Add newly created chatroom to user's owned list
        const user = await User.findById(req.user.id);
        user.chatrooms_owned.push(chatroom._id);
        user.chatrooms_joined.push(chatroom._id);
        await user.save();
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
        const chatroom = await Chatroom.findById(req.params.id);
        // Find owner of chatroom
        const chatroomOwner = await User.findById(chatroom.owner);
        // Remove chatroom reference from chatroom owner
        chatroomOwner.chatrooms_owned = chatroomOwner.chatrooms_owned.filter(
            (chId) => chId !== req.params.id
        );
        await chatroomOwner.save();
        // Delete reference to this chatroom from every joined user
        for (let joinedUserId of chatroom.users) {
            const joinedUser = await User.findById(joinedUserId);
            joinedUser.chatrooms_joined = joinedUser.chatrooms_joined.filter(
                (chId) => chId !== req.params.id
            );
            await joinedUser.save();
        }
        // Finally delete Chatroom
        await Chatroom.deleteOne({ _id: req.params.id });
        // Delete all chatroom messages
        await Message.deleteMany({ chatroom: req.params.id });

        return res.status(200).json({ chatroom_id: req.params.id });
    } catch (err) {
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
    } catch (err) {
        return next(err);
    }
};

exports.getChatroomMessages = async function (req, res, next) {
    try {
        const chatroom = await Chatroom.findById(req.params.id).populate(
            "messages"
        );
        if (chatroom.populated("messages")) {
            return res.status(200).json({ messages: chatroom.messages });
        } else {
            return next({
                status: 401,
                message: "Could not find the chatroom messages",
            });
        }
    } catch (err) {
        return next(err);
    }
};
