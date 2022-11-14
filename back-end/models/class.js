const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
    rollNum: {
        type: Number,
        unique: true,
        required: false,

    },
    coursesSelected: {
        type: Array,
        default: [],
        required: false

    }

});

const ClassModel = mongoose.model("ClassModel", ClassSchema);

module.exports =  ClassModel;
