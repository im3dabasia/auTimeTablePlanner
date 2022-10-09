const CourseModel = require("../models/course.js");
const StudentModel = require("../models/student.js");

const data = require('../data/course.json')

const pushCourses = async (req, res) => {

    for (const property in data) {
        let { courseName,
            courseId,
            courseTime,
            courseWeeklyFirstLec,
            courseWeeklySecondLec,
            courseDescription,
            courseFaculty } = data[property]

        const newCourse = await CourseModel.create({
            courseName,
            courseId,
            courseTime,
            courseWeeklyFirstLec,
            courseWeeklySecondLec,
            courseDescription,
            courseFaculty

        })
    }

    return res.status(200).json(data)

}

const coursesSelected = async (req, res) => {

    const data = await req.body;
    const arr = data.data
    const coursesRecieved = {
        status:true,
        data

    }
    const mongoDBTempArr = []

    for(let item of arr){
        const tempCourseInfo = await CourseModel.find({ courseId:item });
        mongoDBTempArr.push(tempCourseInfo)

    }

    const tmp = await StudentModel.updateOne({rollNum : data.rollNum}, {$set:{coursesSelected:mongoDBTempArr}});
    console.log(StudentModel.find({rollNum : data.rollNum}))

    return res.status(200).json(coursesRecieved)

}

module.exports = { pushCourses, coursesSelected };
