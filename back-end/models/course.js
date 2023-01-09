const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  studentRollNum:{
    type:Number,
    required: true,
    unique:false
  },
  courseName:{
    type:String,
    required: true,
    unique:false
  },
  courseStartTime:{
    type:String,
    required:true,
  },
  courseEndTime:{
    type:String,
    required:true,
  },
  courseWeeklyFirstLec:{
    type:String,
    required:true,
    min:0,
    max:4
  },
  courseWeeklySecondLec:{
    type:String,
    required:true,
    min:0,
    max:4
  },
  courseDescription:{
    type:String,
    unique:false
  },
  courseFaculty:{
    type:String,
    required:false
  }
});

const CourseModel = mongoose.model("CourseModel", CourseSchema);

module.exports =  CourseModel;

