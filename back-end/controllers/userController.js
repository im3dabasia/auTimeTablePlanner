const bcrypt = require("bcryptjs");
require("dotenv").config();
const StudentModel = require("../models/student.js");

// Global Variable to store Roll number once user is logged in
let studentRollNumber = 0

// Post request: Create a new user 
const registerUser = async (req, res) => {
    try {
        let {
            rollNum,
            name,
            passWord
        } = await req.body;

        studentRollNumber = rollNum
        const userCheck = await StudentModel.findOne({ rollNum });
        if (userCheck)
            return res.json({
                msg: "User already exist, please try to login.",
                status: false,
            });
        const salt = await bcrypt.genSaltSync(10);

        //   const salt = process.env.BCRYPT_SALT;
        const encryptedPassword = await bcrypt.hashSync(passWord, salt);
        const newUser = await StudentModel.create({
            rollNum,
            name,
            passWord: encryptedPassword,
        });
        delete newUser.passWord;

        return res.status(201).json({ status: true, newUser });
    } catch (err) {
        res.status(400).json({
            msg: "error occurs please try again",
            error: err,
            status: false,
        });
    }
};

// Post request: Posts user login details
const loginUser = async (req, res) => {
    let { rollNum, passWord } = await req.body;
    studentRollNumber = rollNum
    const userData = await StudentModel.findOne({ rollNum });
    if (!userData) {
        return res.json({ msg: "User does not exist", status: false });
    } else {
        const isPassCorrect = bcrypt.compareSync(passWord, userData.passWord);
        if (!isPassCorrect) {
            return res.json({ msg: "Wrong password or Roll Number", status: false });
        } else {
            return res.json({
                msg: "Thanks for logging in with us.",
                status: true,
                userData,
            });
        }
    }
};

// Get request: Send user Data
const userDetails = async (req, res) => {
    let { rollNum } = await req.body;
    studentRollNumber = rollNum
    const userData = await StudentModel.findOne({ rollNum });
    if (!userData) {
        return res.json({ msg: "User does not exist", status: false });
    } else {
        return res.json({ userProfile: userData });
    }
};

module.exports = {
    registerUser,
    loginUser,
    studentRollNumber,
    userDetails
};




