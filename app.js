let express = require("express");
let http = require("http");
let morgan = require("morgan");
let socketio = require("socket.io");
let app = express();

let server = http.createServer(app);
let socket = socketio(server);

const PORT = process.env.PORT || 3001;
app.use(morgan("dev"));

// Run wehn client connects
socket.on("connection", (socket) => {
    console.log("New WS Connecttion...");
});

app.get("/", (req, res) => {
    res.send("this is an index page");
});

server.listen(PORT, () => {
    console.log(`App starting at PORT=${PORT}`);
});
