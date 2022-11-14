const ClassModel = require("../models/class.js");

let loggedInRollNumber = 33333333;

    // const data = await ClassModel.findOne({rollNum : loggedInRollNumber})
    // console.log((data.coursesSelected))

const studentCalendarInfo = async (req, res) => {

    console.log(loggedInRollNumber)
    let data = await ClassModel.findOne({rollNum : loggedInRollNumber})

    
    data = (data.coursesSelected)
    if(data){

      for(let i = 0; i < data.length; i++ ){
        console.log(data[i][0]);
      }
    }

    return res.status(200).json(data)

}

const studentRollNumberInfo = async (req, res) => {

    const data = await req.body
    loggedInRollNumber = data.rollNum

    return res.status(200).json(data)

}

module.exports = {studentRollNumberInfo, studentCalendarInfo };
