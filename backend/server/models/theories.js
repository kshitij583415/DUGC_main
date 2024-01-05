// const mongoose = require('mongoose');

// const theorySchema = new mongoose.Schema({
//     Sl_no: { type: Number },
//     USN: { type: String },
//     Name: { type: String },
//     Sem: { type: Number },
//     div: { type: String },
//     CourseId: { type: String },
//     CourseName: { type: String },
//     CIE: { type: Number },
//     Attendance: { type: Number }
// });

// const theoryModel = mongoose.model('theory', theorySchema);

// module.exports = theoryModel;


// models/theory2.js
const mongoose = require("mongoose");

const theorySchema = new mongoose.Schema({
  Sl_no: Number,
  USN: String,
  Name: String,
  Sem: Number,
  div: String,
  CourseId: String,
  CourseName: String,
  CIE: Number,
  Attendance: Number,
});

const Theory = mongoose.model("Theory", theorySchema);

module.exports = Theory;
