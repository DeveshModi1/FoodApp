const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const jwtsecret = "yyyyyyyyyyyyyyyyyyyy"

router.post(
  "/createUser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password , salt);

    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
)
router.post(
  "/loginUser",[
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;


    try {
      let userData = await User.findOne({email});
      if(!userData){
        return res.status(400).json({ errors: "Please Enter Correct Credentials"});    
      }
      const pwdComp = await bcrypt.compare(req.body.password, userData.password)
      if(!pwdComp){
        return res.status(400).json({ errors: "Please Enter Correct Credentials"});
      }
      const data = {
        user:{
            id: userData.id
        }
      }
      const authToken= jwt.sign(data,jwtsecret)
      return res.json({ success: true , authToken:authToken});
      
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);
module.exports = router;
