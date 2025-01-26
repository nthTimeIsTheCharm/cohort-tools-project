const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors("*"));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:

/*
GET	/api/cohorts	(empty)	Returns all the cohorts in JSON format
GET	/api/cohorts/:cohortId	(empty)	Returns the specified cohort by id
*/
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//cohorts
app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});

app.get("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  const matchingCohort = cohorts.find(
    (cohort) => cohort._id === Number(cohortId)
  );
  res.json(matchingCohort);
});

//students
app.post("/api/students", (req, res) => {
  students
    .create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      cohort: req.body.cohort,
      projects: req.body.projects,
    })
    .then((createdStudent) => {
      console.log("Student created ->", createdStudent);
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      console.error("Error while creating the student ->", error);
      res.status(500).json({ error: "Failed to create the student" });
    });
});

app.get("/api/students", (req, res) => {
  Student.find()
    .then((results) => res.json(results))
    .catch((error) => {
      console.error("STUDENTS NOT FOUND", error);
      res.status(404).json({ error: "No student found" });
    });
});

app.get("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  const matchingStudent = students.find(
    (students) => students._id === Number(studentId)
  );
  res.json(matchingStudent);
});

app.get("/api/students/cohort/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  Student.find({ cohort: cohortId })
    .then((student) => {
      res.json(student);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
