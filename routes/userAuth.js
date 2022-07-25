const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const auth = require("./verifyTokens");

router.post(
  "/signup",
  //Validator for email (express-validator)
  body("email").isEmail(),

  //Validator for Password (express-validator)
  body("password").isLength({ min: 6 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Validator for checking if email already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists)
      return res.status(400).send("Email address already exists");

    //Validator for checking if mobile already exists
    const mobileExists = await User.findOne({ mobile: req.body.mobile });
    if (mobileExists)
      return res.status(400).send("Mobile Number already exists");

    // Crypting password (bcrypt) 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashedPassword,
    });

    try {
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  }
);

router.post(
  "/signin",
  //Validator for email (express-validator)
  body("email").isEmail(),

  //Validator for Password (express-validator)
  body("password").isLength({ min: 6 }),

  async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) return res.status(400).send("Email is not found");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Something Went Wrong");

    const payload = {
      _id: user._id,
      permissions: user.permissions,
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.send(token);
  }
);

router.get("", auth("user:get"), async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get("/:id", auth("user:get"), async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id,
  });
  res.send(user);
});

module.exports = router;
