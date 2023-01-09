const CourseModel = require("../models/course.js");

// Global scope to store user Roll number once logged in
let loggedInRollNumber = 0;

// Send calendar information based on the student roll number.
const studentCalendarInfo = async (req, res) => {
    let data = await CourseModel.find({
      studentRollNum : loggedInRollNumber
    })
    if(data != null ){
      return res.status(200).json(data)
    }
    return res.status(200).json({"NO DATA":"NO DATA"})
}

// Send Roll number information based.
const sendRollNumber = async (req, res) => {
    const data = await req.body
    loggedInRollNumber = data.rollNum
    return res.status(200).json(data)
}

module.exports = {studentCalendarInfo, sendRollNumber };

