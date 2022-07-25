const router = require("express").Router();
const Role = require("../model/Role");
const auth = require("./verifyTokens")

router.post("", async (req, res) => {
  const role = new Role({
    name: req.body.name,
    scopes:req.body.scopes
  });

  try {
    const savedRole = await role.save();
    res.send(savedRole);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("", auth("role:get"),async (req, res) => {
  const roles = await Role.find();
  res.send(roles);
});



module.exports = router;
