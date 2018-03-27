var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect(process.env.MONGOLAB_URL);

mongoose.Promise = Promise;

module.exports.Memoir = require("./memoir");
module.exports.Comment = require("./comment");
module.exports.User = require("./user");
module.exports.Feedback = require("./feedback");
module.exports.Mse = require("./mse");
module.exports.Post = require("./post");
module.exports.Test = require("./test");
module.exports.Disorder = require("./disorder");


