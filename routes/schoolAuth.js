const router = require("express").Router();
const School = require("../model/School");
const auth = require("./verifyTokens");

router.post("/", auth("school:create"), async (req, res) => {
  const school = new School({
    name: req.body.name,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
  });

  try {
    const savedSchool = await school.save();
    res.send(savedSchool);
  } catch (err) {
    res.status(400).send(err);
  }
});


router.get("", auth("school:get"), async (req, res) => {
  const schools = await School.find();
  res.send(schools);
});

router.get("/school", auth("school:students"), async (req, res) => {
  const schools = await School.find();
  res.send(schools);
});


module.exports = router;
