import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  // go ahead and fill them
});

const model = mongoose.model("ClassModel", ClassSchema);

export default model;
