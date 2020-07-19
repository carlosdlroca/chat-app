const mongoose = require("mongoose");
const User = require("./user");
const Message = require("./message");

const chatroomSchema = mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

chatroomSchema.pre("remove", async function (next) {
    try {
        // Delete chatroom reference from chatroom owners list
        let user = await User.findById(this.owner);
        user.chatroom_owned.remove(this.id);
        // Remove this chatrooms reference in each chatroom users list
        User.deleteOne({ chatrooms_joined: this.id });
        await user.save();

        // Delete every message in this chatroom
        Message.deleteMany({ chatroom_id: this.id });
        return next();
    } catch (err) {
        return next(err);
    }
});

module.exports = mongoose.model("Chatroom", chatroomSchema);
