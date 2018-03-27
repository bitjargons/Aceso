var mongoose = require("mongoose")

var mseSchema = new mongoose.Schema({
  student: {
    
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
    	name: String,
      age: Number,
      isElder: {
      	type: Boolean,
      	default: false
      }
    },
    income: Number
  },

  treatments: [
   	{
   		problem: String,
   		isStudentProblem: {
      	type: Boolean,
      	default: false
      },
   		isMentalProblem: {
      	type: Boolean,
      	default: false
      }
   	}
  ],

  familyHealth: [
	  {
	   	problem: String,
	  	isMentalProblem: {
      	type: Boolean,
      	default: false
      }
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
 			played: {
      	type: Boolean,
      	default: false
      },
 			reason: String
 		}
 	],
 	education: {
 		highSchool: {
 			hasCompleted: {
      	type: Boolean,
      	default: false
      },
 			fromSchool: String
 		},

 		higherSecondary: {
 			hasCompleted: Boolean,
 			fromSchool: String
 		},

 		diploma: {
 			hasCompleted: {
      	type: Boolean,
      	default: false
      },
 			fromCollege: String
 		},

 		graduation: {
 			hasCompleted: {
      	type: Boolean,
      	default: false
      },
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
})

module.exports = mongoose.model("mse", mseSchema)