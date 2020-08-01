let socketio = require("socket.io");
const { Chatroom, Message } = require("../models");

function startConnection(server) {
    let io = socketio(server);
    io.sockets.on("connection", (socket) => {
        // Join Room
        socket.on("joinRoom", (room, user) => {
            console.log("joining room");
            console.log({ user });
            socket.join(room);
            socket.to(room).emit("notification", "User has connected");
            socket.to(room).emit("userJoinedRoom", user);
        });

        // Leave room
        socket.on("leaveRoom", (room, user) => {
            console.log("leaving room");
            console.log({ user });
            socket.to(room).emit("notification", "User has disconnected");
            socket.to(room).emit("userLeftRoom", user);
            socket.leave(room);
        });

        // Send Message in chatroom
        socket.on(
            "sendMessage",
            async (chatroomId, message, username, user_id) => {
                try {
                    const chatroom = await Chatroom.findById(chatroomId);
                    const newMessage = await Message.create({
                        text: message,
                        username,
                        user_id,
                    });
                    chatroom.messages.push(newMessage);
                    await chatroom.save();
                    io.to(chatroomId).emit("message", newMessage);
                } catch (err) {
                    console.log(err);
                    socket.to(chatroomId).emit("error", "something went wrong");
                }
            }
        );
    });
}

module.exports = startConnection;
