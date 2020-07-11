let express = require("express");
let http = require("http");
let morgan = require("morgan");
let path = require("path");
let app = express();
let server = http.createServer(app);

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
