var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
   question: String,
   description: String,
   links: [
      {
         url: String,
         title: String
      }
   ],
   parent: {
   	id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Disorder"
        },
        disorder: String
   }
});

module.exports = mongoose.model("Post", postSchema);