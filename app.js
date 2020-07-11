const express = require("express");
const http = require("http");
const morgan = require("morgan");
const path = require("path");
const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

// Initialize and link socket to server
require("./config/socket.js")(server);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => {
    res.send("this is an index page");
});

server.listen(PORT, () => {
    console.log(`App starting at PORT=${PORT}`);
});
