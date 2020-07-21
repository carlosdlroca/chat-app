const mongoose = require("mongoose");
const User = require("./user");
const Message = require("./message");

const chatroomSchema = mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

chatroomSchema.pre("deleteOne", async function (next) {
    try {
        // Delete chatroom reference from chatroom owners list
        let owner = await User.findById(this.owner);
        await owner.chatrooms_owned.deleteOne(this.id);

        // Remove this chatrooms reference in each chatroom users list
        User.deleteOne({ chatrooms_joined: this.id });
        await user.save();
        // Delete every message in this chatroom
        for (const msg_id of this.messages) {
            await Message.deleteOne({ id: msg_id });
        }
        // Delete chatroom reference from user's chatrooms_joined
        for (const user_id of this.users) {
            const user = await User.findById(user_id);
            await user.chatrooms_joined.deleteOne({ id: this.id });
            await user.save();
        }

        return next();
    } catch (err) {
        return next(err);
    }
});

chatroomSchema.methods.addUser = async function (user_id, next) {
    try {
        this.users.push(user_id);
        await this.save();
    } catch (err) {
        return next(err);
    }
};

chatroomSchema.methods.removeUser = async function (user_id, next) {
    try {
        this.users = this.users.filter((id) => user_id !== id);
        await this.save();
    } catch (err) {
        return next(err);
    }
};

chatroomSchema.methods.removeAllUsers = async function (next) {
    try {
        this.users = [];
        await this.save();
    } catch (err) {
        return next(err);
    }
};

module.exports = mongoose.model("Chatroom", chatroomSchema);
