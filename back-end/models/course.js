import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  // go ahead and fill them
});

const model = mongoose.model("CourseModel", CourseSchema);

export default model;
