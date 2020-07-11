const express = require("express");
const http = require("http");
const morgan = require("morgan");
const path = require("path");
const app = express();
const server = http.createServer(app);
const errorHandler = require("./handlers/error");

const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 3001;

// Initialize and link socket to server
require("./config/socket.js")(server);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api/", authRoutes);

app.use((req, res, next) => {
    const error = new Error("Not Found!");
    error.status = 404;
    next(error);
});
app.use(errorHandler);

server.listen(PORT, () => {
    console.log(`App starting at PORT=${PORT}`);
});
