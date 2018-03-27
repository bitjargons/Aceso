var mongoose = require("mongoose")

var mseSchema = new mongoose.Schema({
  student: {
    name: String,
    bday: Date,
    gender: String,
    weight: Number,
    address: String,
    pincode : Number,
    // selfhealthissue : Boolean,
    // selfissuetype1 : String,
    // selfissuetype2 : String,
    // selfissuedesc : String,
    // question1 : String,
    // question2 : String    
  },
  
  family: {
    father: {
      name: String,
      age: Number,
      job: String
    },

    mother: {
      name: String,
      age: Number,
      job: String
    },

    sibling: {
    	details: String
    },

    income: Number
  },
 	user: {
 		id: {
 			type: mongoose.Schema.Types.ObjectId,
 			ref: "User"
 		},
 		email: String
 	}
})

module.exports = mongoose.model("mse", mseSchema)