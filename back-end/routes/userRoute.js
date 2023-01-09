const express = require("express")
const { registerUser,
        loginUser,
        userDetails} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/userdetails", userDetails);

module.exports = userRouter;

