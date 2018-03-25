var	mongoose = require("mongoose");

var feedbackSchema = new mongoose.Schema({
	createdAt: { type: Date, default: Date.now },
	author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
	feedback: String,
	rating: String
});

module.exports = mongoose.model("Feedback",feedbackSchema);
// Schema ends Here This Goes Into modals folder