const express = require('express')
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute")
const courseRouter = require('./routes/courseRoute');
const calendarRouter = require('./routes/calendarRoute')

// Connect to GLobal database
connectDB();

// Creating an instance of an express app
const app = express();

// Communicate with backend
const cors=require("cors");
const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())

// Subrouters
app.use("/api", userRouter);
app.use("/api", courseRouter);
app.use("/api", calendarRouter);

// Listening to port
app.listen(5000, () => {
    console.log(`Server is running on port ${"5000"}`); 
});

