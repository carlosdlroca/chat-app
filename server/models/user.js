const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Chatroom = require("./chatroom");

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    chatrooms_owned: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chatroom",
        },
    ],
    chatrooms_joined: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chatroom",
        },
    ],
    isAdmin: Boolean,
});

userSchema.pre("save", async function hashPassword(next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }

        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;

        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.pre("remove", async function (next) {
    try {
        Chatroom.remove({ chatroom_owner: this.id });
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function comparePassword(
    candidatePassword,
    next
) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
};

module.exports = mongoose.model("User", userSchema);
