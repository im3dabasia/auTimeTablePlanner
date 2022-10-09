const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({

  name:{
    type:String,
    required: true,

  },

  rollNum:{
    type:Number,
    unique:true,
    required: false,

  },

  passWord:{
    type:String,
    required:true,
    min:8,
    max:16
    
  },

  coursesSelected:{
    type:Array,
    default:[],
    required:false

  }

});

const StudentModel = mongoose.model("StudentModel", StudentSchema);

module.exports =  StudentModel;
