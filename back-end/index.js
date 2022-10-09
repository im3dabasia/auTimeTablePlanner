const express = require('express')
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute")
const courseRouter = require('./routes/courseRoute');

const cors=require("cors");

connectDB();

const app = express();

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json())


app.get("/", function(req, res) {
    res.send("home page")
})

app.get("/dashboard", function(req, res) {
    res.send("Welcome to student page")
    console.log("Student Home ")
})

app.use("/api", userRouter);
app.use("/api", courseRouter);

app.listen(5000, () => {
    console.log(`Server is running on port ${"5000"}`);
});