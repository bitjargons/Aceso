var mongoose = require("mongoose");

var mseSchema = new mongoose.Schema({
  family: {
    father {
      name: String,
      age: Number,
      job: String
    },

    mother {
      name: String,
      age: Number,
      job: String
    },

    sibling {
    	name: String,
      age: Number,
      isElder: Boolean
    },

    income: Number
  },

  treatments: [
   	{
   		problem: String,
   		isStudentProblem: Boolean,
   		isMentalProblem: Boolean
   	}
  ],

  familyHealth: [
	  {
	   	problem: String,
	  	isMentalProblem: Boolean
	  }
  ],

  childhood: [
   	{
   		experience: String
   	}
 	],

 	playHistory: [
 		{
 			game: String,
 			played: Boolean,
 			reason: String
 		}
 	],

 	education: {
 		highSchool {
 			hasCompleted: Boolean,
 			fromSchool: String
 		},

 		higherSecondary {
 			hasCompleted: Boolean,
 			fromSchool: String
 		},

 		diploma {
 			hasCompleted: Boolean,
 			fromCollege: String
 		},

 		graduation {
 			hasCompleted: Boolean,
 			fromCollege: String
 		}
 	},

 	user: {
 		id: {
 			type: mongoose.Schema.Types.ObjectId,
 			ref: "User"
 		},
 		email: String
 	}
});

module.exports = mongoose.model("mse", mseSchema);