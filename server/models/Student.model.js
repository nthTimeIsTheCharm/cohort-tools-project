const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const StudentSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  linkedinUrl: {
    type: String,
    required: [true, "LinkedIn URL is required"],
  },
  languages: {
    type: [String],
    required: [true, "Languages are required"],
  },
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
    required: [true, "Program is required"],
  },
  background: {
    type: String,
    required: [true, "Background is required"],
  },
  cohort: {
    type: Schema.Types.ObjectId,
    ref:"Cohort",
    required: [true, "Cohort is required"]
    
  },
  projects: {
    type: [String],
  },
});
const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
