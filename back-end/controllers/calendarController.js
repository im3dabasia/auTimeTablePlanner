const CourseModel = require("../models/course.js");

let loggedInRollNumber = 0;
const studentCalendarInfo = async (req, res) => {
    let data = await CourseModel.find({studentRollNum : loggedInRollNumber})
    if(data != null ){
      return res.status(200).json(data)

    }

    return res.status(200).json({"NO DATA":"NO DATA"})
}

const sendRollNumber = async (req, res) => {
    const data = await req.body
    loggedInRollNumber = data.rollNum
    return res.status(200).json(data)

}

module.exports = {studentCalendarInfo, sendRollNumber };

