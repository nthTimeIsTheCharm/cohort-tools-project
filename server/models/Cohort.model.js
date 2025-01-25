const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
  cohortSlug: {
    type: String,
  },
  cohortName: {
    type: String,
  },
  program: {
    type: String,
    enum: ["Web Development", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  format: {
    type: String,
    enum: ["Full Time", "Part Time"],
  },
  campus: {
    type: String,
    enum: [
      "Madrid",
      "Barcelona",
      "Miami",
      "Paris",
      "Berlin",
      "Amsterdam",
      "Lisbon",
      "Remote",
    ],
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  inProgress: { type: Boolean, default: true },
  programManager: {
    type: String,
  },
  leadTeacher: {
    type: String,
  },
  totalHours: {
    type: Number,
    min: 0,
  },
});

const cohort = mongoose.model("Cohort", CohortSchema);

module.exports = Cohort;
