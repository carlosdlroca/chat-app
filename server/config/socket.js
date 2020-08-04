let socketio = require("socket.io");
const { Chatroom, Message } = require("../models");

function startConnection(server) {
    let io = socketio(server);
    io.sockets.on("connection", (socket) => {
        // Join Room
        socket.on("joinRoom", (room, user) => {
            console.log("joining room");
            socket.join(room);
            socket.to(room).emit("notification", "User has connected");
            socket.to(room).emit("userJoinedRoom", user);
        });

        // Leave room
        socket.on("leaveRoom", (room, user) => {
            console.log("leaving room");
            socket.to(room).emit("notification", "User has disconnected");
            socket.to(room).emit("userLeftRoom", user);
            socket.leave(room);
        });

        // Send Message in chatroom
        socket.on(
            "attemptSendMessage",
            async (chatroomId, message, username, user_id) => {
                try {
                    const chatroom = await Chatroom.findById(chatroomId);
                    const newMessage = await Message.create({
                        text: message,
                        username,
                        user_id,
                        chatroom: chatroomId,
                    });
                    chatroom.messages.push(newMessage);
                    await chatroom.save();
                    io.to(chatroomId).emit("recieveMessage", newMessage);
                } catch (err) {
                    console.log(err);
                    io.to(chatroomId).emit("error", "something went wrong");
                }
            }
        );

        socket.on("attemptDeleteMessage", async (chatroomId, messageId) => {
            try {
                await Message.deleteOne({ _id: messageId });
                const chatroom = await Chatroom.findById(chatroomId);
                chatroom.messages = chatroom.messages.filter(
                    (messageId) => messageId !== messageId
                );
                await chatroom.save();
                io.to(chatroomId).emit("deleteMessage", messageId);
            } catch (err) {
                console.log({ err });
            }
        });

        socket.on("attemptClearChat", async (chatroomId, user_id) => {
            try {
                const chatroom = await Chatroom.findById(chatroomId);
                await Message.deleteMany({ chatroom: chatroomId });
                chatroom.messages = [];
                await chatroom.save();

                io.to(chatroomId).emit("clearedChat");
            } catch (err) {
                console.log(err);
                io.to(chatroomId).emit("error", "oops");
            }
        });
    });
}

module.exports = startConnection;
