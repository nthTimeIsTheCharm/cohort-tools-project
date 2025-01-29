// IMPORTS

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// CONNECT TO DB

const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));


// IMPORT MODELS

const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");

// INITIALIZE EXPRESS APP 

const app = express();

// MIDDLEWARE

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors("*"));

// DOC ROUTE

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// COHORT ROUTES

// GET

app.get("/api/cohorts", (req, res) => {
  Cohort.find()
    .then((results) => res.json(results))
    .catch((error) => {
      console.error("COHORT NOT FOUND", error);
      res.status(404).json({ error: "No cohort found" });
    });
});

app.get("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Cohort.findById(cohortId)
    .then((results) => res.json(results))
    .catch((error) => {
      console.error("COHORT NOT FOUND", error);
      res.status(404).json({ error: "No cohort found" });
    });
});

// POST

app.post("/api/cohorts", (req, res) => {
  Cohort.create({
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    inProgress: req.body.inProgress,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
  })
    .then((createdCohort) => {
      console.log("Cohort created ->", createdCohort);
      res.status(201).json(createdCohort);
    })
    .catch((error) => {
      console.error("Error while creating the cohort ->", error);
      res.status(500).json({ error: "Failed to create the cohort" });
    });
});

//PUT

app.put("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(
    req.params.cohortId,
    {
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      format: req.body.format,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      inProgress: req.body.inProgress,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours,
    },
    { new: true }
  )

    .then((cohort) => {
      res.json(cohort);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// DELETE

app.delete("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)

    .then((cohort) => {
      res.json({ cohort });
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

//STUDENTS ROUTES

// GET

app.get("/api/students", (req, res) => {
  Student.find()
    .populate("cohort")
    .then((results) => res.json(results))
    .catch((error) => {
      console.error("STUDENTS NOT FOUND", error);
      res.status(404).json({ error: "No student found" });
    });
});

app.get("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Student.findById(studentId)
    .populate("cohort", "cohortName")
    .then((results) => res.json(results))
    .catch((error) => {
      console.error("STUDENT NOT FOUND", error);
      res.status(404).json({ error: "No student found" });
    });
});

app.get("/api/students/cohort/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((student) => {
      res.json(student);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// POST

app.post("/api/students", (req, res) => {
  console.log(req.body);

  Student.create({
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

// PUT

app.put("/api/students/:studentId", (req, res) => {
  Student.findByIdAndUpdate(
    req.params.studentId,
    {
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
    },
    { new: true }
  )

    .then((student) => {
      res.json(student);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// DELETE

app.delete("/api/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)

    .then((student) => {
      res.json({ student });
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
