const express = require("express");
const router = express.Router();
const User = require("../models/user");

const { body, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "HelloIamAbhinavSinha'DTU25";

// Post When sending any data via user
// Using Express-validator for custom validation (can be done via mangoose also)

router.post(
  "/createuser",
  [
    body("email", "E-Mail format is not correct! ").isEmail(),
    body("name", "Name is too small!").isLength({ min: 5 }),
    body("password", "Password is too small!").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //  Encoding password using BcryptJS
    const salt = bcrypt.genSaltSync(10);
    const encodedPassword = await bcrypt.hash(req.body.password, salt);

    //  Sending User Signup details to MongoDb Atlas
    try {
      await User.create({
        name: req.body.name,
        password: encodedPassword,
        email: req.body.email,
        location: req.body.location,
      });

      //res.json({ success: true });

      // ----------------------
      const email = req.body.email;
      let userData = await User.findOne({ email });
      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);
      console.log("New User Signed In");
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "E-Mail format is not correct! ").isEmail(),
    body("password", "Password is too small!").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Logging In by fetching and comparing user input

    const email = req.body.email;

    try {
      let userData = await User.findOne({ email });

      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging with Correct Credentials !" });
      }

      // Matching password
      const decodedPassword = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (!decodedPassword) {
        return res
          .status(400)
          .json({ errors: "Try logging with Correct Password !" });
      }

      console.log("Logged In");

      // Creating Auth Token for staying loggedIn
      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
