const StudentModel = require("../models/student.js");
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    let { rollNum, name, passWord } = await req.body;
    rollNum = parseInt(rollNum,10)

    const checkUserPreExists = await StudentModel.exists({ rollNum });

    const objectToSend = {
        userExists: checkUserPreExists,
        nextPage:false
    }
    if (checkUserPreExists) {
        
        return res.status(200).json(objectToSend)

    }else{

        const tempObj = {
            rollNum,
            name,
            passWord
        }


        const newUser = await StudentModel.create({
            rollNum,
            name,
            passWord
        })

        delete tempObj.passWord;

        objectToSend.userDetails = tempObj
        objectToSend.nextPage = true;

    }

    return res.status(200).json(objectToSend)
}

const loginUser = async (req, res) => {
    let { rollNum, passWord } = await req.body;

    rollNum = await parseInt(rollNum,10);

    
    const oldUser = {
        rollNum,
        passWord
    }

    delete oldUser.passWord

    const objectToSend = {
        userRollNumberExists: false,
        passWordCorrect: false,
        userExists: false,
        userDetails: oldUser,
        nextPage:false
    }

    const rollNumCheckInDB = await StudentModel.exists({ rollNum });

    if (rollNumCheckInDB) {
        objectToSend.userRollNumberExists = true;

    }

    const userExists = rollNumCheckInDB && await StudentModel.exists({ rollNum, passWord })

    if (rollNumCheckInDB) {

        if (userExists) {
            objectToSend.userExists = true;
            objectToSend.passWordCorrect = true;
            objectToSend.nextPage = true;

        }
        else {
            objectToSend.userExists = true;
            objectToSend.passWordCorrect = false;

        }
    }
    res.status(200).json({ objectToSend })

}
module.exports = { registerUser, loginUser };