const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  courseName:{
    type:String,
    required: true,

  },
  courseId:{
    type:String,
    required:true
    
  },
  courseTime:{
    type:String,
    required:true,

  },
  courseWeeklyFirstLec:{
    type:Number,
    required:true,
    min:0,
    max:4

  },
  courseWeeklySecondLec:{
    type:Number,
    required:true,
    min:0,
    max:4

  },
  courseDescription:{
    type:String

  },
  courseFaculty:{
    type:String,
    required:true

  }

});


const CourseModel = mongoose.model("CourseModel", CourseSchema);


module.exports =  CourseModel;