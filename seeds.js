var mongoose = require("mongoose");
var Memoir = require("./models/memoir");
var Comment   = require("./models/comment");


function seedDB() {
  Memoir.remove({}, function(err){
    if(err){
      console.log(err);
    }
     console.log("removed campgrounds!");
	})
}

module.exports = seedDB;
