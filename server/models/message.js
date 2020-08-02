const mongoose = require("mongoose");
const Chatroom = require("./chatroom");

const messageSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            maxLength: 250,
        },
        chatroom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chatroom",
        },
        username: String,
        user_id: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Message", messageSchema);
