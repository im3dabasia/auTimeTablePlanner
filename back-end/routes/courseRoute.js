const express = require("express")
const { pushCourses,
        coursesChosen,
        sendRollNumber,
        deleteCourse,
        viewCourse,
        editCourse} = require("../controllers/courseController");

const courseRouter  = express.Router();

courseRouter.post("/courseselection", pushCourses);
courseRouter.post("/courseselection/rollnumber", sendRollNumber);
courseRouter.get("/courseselection", coursesChosen);
courseRouter.get("/courseselection/id/:id", viewCourse);
courseRouter.patch("/courseselection/id/:id", editCourse);
courseRouter.delete("/courseselection/id/:id", deleteCourse);

module.exports = courseRouter;


