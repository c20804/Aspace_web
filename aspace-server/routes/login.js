var express = require('express');
var router = express.Router();
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");

router.post('/', async(req, res) => {
    //check validation of data
    const { error } = loginValidation(req.body);
    if (error) {
        // console.log(error);
        return res.status(400).send(error.details[0].message);
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
          res.status(400).send(err);
        }
        if (!user) {
          res.status(401).send("User not found.");
        } else {
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) return res.status(400).send(err);
            if (isMatch) {
              const tokenObject = { email: user.email };
              const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
              res.send({ success: true, token: "JWT " + token, user });
            } else {
              res.status(401).send("Wrong password.");
            }
          });
        }
      });
  });


module.exports = router;