var mongoose = require("mongoose");

var disorderSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   posts: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Post"
      }
   ]
});

module.exports = mongoose.model("Disorder", disorderSchema);