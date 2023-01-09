const CourseModel = require("../models/course.js");

// Global Variable to store Roll number once user is logged in
let studentRollNumber = 0

// Post request: To add course in the database
const pushCourses = async (req, res) => {
    let data = await req.body;
    let obj = {
        courseName,
        courseFacultyName,
        courseDescription,
        courseStartTime,
        courseEndTime,
        courseDayOne,
        courseDayTwo
    } = await req.body.data;

    // Converts String to Int datatype
    studentRollNumber = parseInt(req.body.rollNum, 10)

    const objectToSend = {
        courseDetails: data,
        info: "courseAdded"
    }
    const newCourse = await CourseModel.create({
        studentRollNum: studentRollNumber,
        courseName: courseName,
        courseStartTime: courseStartTime,
        courseEndTime: courseEndTime,
        courseWeeklyFirstLec: courseDayOne,
        courseWeeklySecondLec: courseDayTwo,
        courseDescription: courseDescription,
        courseFaculty: courseFacultyName
    })
    return res.status(200).json(objectToSend)
}

// Get request: Sends courses 
const coursesChosen = async (req, res) => {
    let data = await CourseModel.find({
        studentRollNum : studentRollNumber
    })
    return res.status(200).json(data)
}

// Get request: Send roll number details to the client
const sendRollNumber = async (req, res) => {
    let data = await req.body;
    studentRollNumber = data.rollNum
    const objectToSend = {
        data:data,
        rollnumber:true
    }
    return res.status(200).json(objectToSend)
}

// Delete request: to delete a course
const deleteCourse = async (req, res) => {
    const objectToSend = {
        deleted:false
    }

    let id = await req.params.id;
    let course = await CourseModel.deleteOne({
        _id : id
    })
    if(course){
        objectToSend.deleted = true
    }
    return res.status(200).json(objectToSend)
}

// Get request: to view a course
const viewCourse = async (req, res) => {
    const objectToSend = {
        data:null,
        editable:false
    }
    let id = await req.params.id;
    let course = await CourseModel.find({
        _id : id
    })
    if(course != null){
        objectToSend.data = course[0],
        objectToSend.editable = true
    }
    return res.status(200).json(objectToSend)
}

const editCourse = async (req, res) => {
    const userData = req.body.data
    const id = req.params.id
    const objectToSend = {
        updated:false
    }
    let course = await CourseModel.findByIdAndUpdate( id, { 
        courseName: userData.courseName,
        courseStartTime: userData.courseStartTime,
        courseEndTime: userData.courseEndTime,
        courseWeeklyFirstLec: userData.courseDayOne,
        courseWeeklySecondLec: userData.courseDayTwo,
        courseDescription: userData.courseDescription,
        courseFaculty: userData.courseFacultyName
})
    if(course != null){
        objectToSend.updated = true
    }
    return res.status(200).json(objectToSend)
}

module.exports = { 
    pushCourses,
    coursesChosen,
    sendRollNumber,
    deleteCourse,
    viewCourse,
    editCourse
};

