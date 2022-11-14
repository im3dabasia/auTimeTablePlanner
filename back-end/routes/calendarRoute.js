const express = require("express")
const { studentRollNumberInfo, studentCalendarInfo} = require("../controllers/calendarController");

const calendarRouter  = express.Router();

calendarRouter.get("/dashboard", studentCalendarInfo);
calendarRouter.post("/dashboard", studentRollNumberInfo);


module.exports = calendarRouter;
