const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.set("useCreateIndex", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://127.0.0.1:27017", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports.User = require("./user");
module.exports.Message = require("./message");
module.exports.Chatroom = require("./chatroom");
