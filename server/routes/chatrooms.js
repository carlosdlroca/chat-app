const express = require("express");
const router = express.Router();
const {
    getChatrooms,
    createChatroom,
    getChatroom,
    deleteChatroom,
} = require("../handlers/chatroom");
const { loginRequired } = require("../middleware/auth");
const { ensureUserOwnsChatroom } = require("../middleware/chatroom");

router.route("/").all(loginRequired).get(getChatrooms).post(createChatroom);

router.get("/:id", loginRequired, getChatroom);
router.delete("/:id", loginRequired, ensureUserOwnsChatroom, deleteChatroom);

router.get("/:id/users");

module.exports = router;
