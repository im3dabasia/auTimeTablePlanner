import mongoose from "mongoose";
import Student from "../models/student";

mongoose.connect("mongodb://localhost:27017/coursePlanner");

export default async function handler(req, res) {
  const { rollNumber, password } = req.body;

  let studentData = await Student.findOne({ rollNumber: rollNumber });

  res.status(200).json({ name: "codedamn" });
}
