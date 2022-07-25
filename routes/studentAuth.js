const router = require("express").Router();
const Student = require("../model/Student");
const auth = require("./verifyTokens");


router.post("", auth("student:create"), async (req, res) => {
  const student = new Student({
    name: req.body.name,
    userId: req.body.userId,
    schoolId: req.body.schoolId,
  });
  try {
    const savedStudent = await student.save();
    res.send(savedStudent);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("", auth("student:get"), async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

module.exports = router;
