/*
    External Modules
*/
const express = require('express')
const cors=require("cors");

const connectDB = require("./config/db");

/*
    Local Modules Routers
    App Routes
*/
const userRouter = require("./routes/userRoute")
const courseRouter = require('./routes/courseRoute');
const calendarRouter = require('./routes/calendarRoute')

// Connect to Global database
connectDB();

// Creating an instance of an express app
const app = express();

// Communicate with backend across all origins 
const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())

/*
    Local Modules Routers
    App Sub Routes
*/
app.use("/api", userRouter);
app.use("/api", courseRouter);
app.use("/api", calendarRouter);

// Listening to port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});

