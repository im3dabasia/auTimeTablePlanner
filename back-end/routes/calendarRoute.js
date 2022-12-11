const express = require("express")
const { studentCalendarInfo,
        sendRollNumber} = require("../controllers/calendarController");

const calendarRouter  = express.Router();

calendarRouter.get("/dashboard", studentCalendarInfo);
calendarRouter.post("/dashboard/rollnumber", sendRollNumber);

module.exports = calendarRouter;

