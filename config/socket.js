let socketio = require("socket.io");
let io;

function setupSocket(server) {
    io = socketio(server);
    startConnection();
}

function startConnection() {
    io.on("connection", (socket) => {
        console.log("socket connected");
        socket.emit("message", "hey! glad you connected");

        socket.broadcast.emit("message", "A User has joined the chat");
        socket.on("disconnect", () => {
            io.emit("message", "A User has left the chat");
        });
    });
}

module.exports = setupSocket;
