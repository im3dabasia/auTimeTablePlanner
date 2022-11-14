const express = require("express")
const {  coursesSelected, pushCourses} = require("../controllers/courseController");

const courseRouter  = express.Router();

courseRouter.get("/courseselection", pushCourses);
courseRouter.post("/courseselection", coursesSelected);

module.exports = courseRouter;
