const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// definimos el esquema de la colección
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
  linkedInUrl: {
    type: String,
    required: [true, "LinkedIn URL is required"],
  },
  languages: {
    type: [String],
    required: [true, "Languages are required"],
  },
  program: {
    type: String,
    enum: ["Web Development", "UX/UI", "Data Analytics", "Cybersecurity"],
    required: [true, "Program is required"],
  },
  background: {
    type: String,
    required: [true, "Background is required"],
  },
  cohort: {
    type: ,
    required: [true, "Cohort is required"],
  },
  projects: {
    type: [String],
  },
});
const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
