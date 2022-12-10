const CourseModel = require("../models/course.js");

let loggedInRollNumber = 0;

    // const data = await ClassModel.findOne({rollNum : loggedInRollNumber})
    // console.log((data.coursesSelected))

const studentCalendarInfo = async (req, res) => {

    console.log(loggedInRollNumber)
    let data = await CourseModel.find({studentRollNum : loggedInRollNumber})
    console.log("1",data)

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
