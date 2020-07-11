let mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://127.0.0.1:27017", {
    useMongoClient: true,
    keepAlive: true,
});
