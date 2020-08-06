let socketio = require("socket.io");
const { Chatroom, Message } = require("../models");

function startConnection(server) {
    let io = socketio(server);

    io.sockets.on("connection", (socket) => {
        // Join Room
        socket.on("joinRoom", (room, user) => {
            socket.join(room);
            socket
                .to(room)
                .emit("notification", `${user.username} has connected`);

            // attatch joined user to this specific room
            if (!io.nsps["/"].adapter.rooms[room].users) {
                io.nsps["/"].adapter.rooms[room].users = [user];
            } else {
                io.nsps["/"].adapter.rooms[room].users.push(user);
            }
            io.in(room).emit(
                "userJoinedRoom",
                io.nsps["/"].adapter.rooms[room].users
            );
        });

        // Leave room
        socket.on("leaveRoom", (room, userLeaving) => {
            socket
                .to(room)
                .emit(
                    "notification",
                    `${userLeaving.username} has disconnected`
                );
            let newUsersList;
            if (
                io.nsps["/"].adapter.rooms[room].users == null ||
                io.nsps["/"].adapter.rooms[room].users.length < 1
            ) {
                newUsersList = [];
            } else {
                newUsersList = io.nsps["/"].adapter.rooms[room].users.filter(
                    (user) => user.id !== userLeaving.id
                );
                io.nsps["/"].adapter.rooms[room].users = [...newUsersList];
            }
            io.in(room).emit("userLeftRoom", newUsersList);
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
                    io.to(chatroomId).emit("receiveMessage", newMessage);
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
