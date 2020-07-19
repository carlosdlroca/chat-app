const mongoose = require("mongoose");
const Chatroom = require("./chatroom");

const messageSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            maxLength: 250,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        chatroom_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chatroom",
        },
    },
    {
        timestamps: true,
    }
);

messageSchema.pre("remove", async function (next) {
    try {
        let chatroom = await Chatroom.findById(this.chatroom);
        chatroom.messages.remove(this.id);
        await chatroom.save();
        return next();
    } catch (err) {
        return next(err);
    }
});

module.exports = mongoose.model("Message", messageSchema);
