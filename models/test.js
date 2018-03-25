var mongoose = require("mongoose");

var testSchema = new mongoose.Schema({
  name: String,
  scores: Object,
  takenAt: {
  	type: Date,
  	default: Date.now
  },
  takenBy: {
  	id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
    	},
    email: String
  },
  isCritical: {type: Boolean, default: false}
});

module.exports = mongoose.model("Test", testSchema);