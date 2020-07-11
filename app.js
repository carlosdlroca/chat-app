const express = require("express");
const http = require("http");
const morgan = require("morgan");
const path = require("path");
const app = express();
const server = http.createServer(app);

const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("./models");
const PORT = process.env.PORT || 3001;

// Initialize and link socket to server
require("./config/socket.js")(server);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "client/build")));

app.use(
    expressSession({
        secret: "Thisisasecretpleasedontshareit",
        resave: true,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
    res.send("this is an index page");
});

server.listen(PORT, () => {
    console.log(`App starting at PORT=${PORT}`);
});
