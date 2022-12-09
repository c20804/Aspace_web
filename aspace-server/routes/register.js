var express = require('express');
var router = express.Router();
const User = require("../models").userModel;
const registerValidation = require("../validation").registerValidation;

// Create
router.post('/register', async(req, res) => {
    console.log(req.body);

    const newUser = new User(req.body);
    
    //check validation of data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if the user exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email has already been registered.");

    try{
        const savedUser = await newUser.save();
        res.status(200).send({
          msg: "success",
          savedObject: savedUser,
        });
    } catch(err) {
        res.status(400).send("User not saved.");
    }
  });

// // Update
// router.put('/:id', async(req, res) => {

//   try{
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id, 
//       { $set: req.body}, 
//       { new:true }
//     );
//     res.send("Success");
//   } catch(err) {
//     res.status(500).json(err);
//   }
// });

// // Delete
// router.delete('/:id', async(req, res) => {

//   try{
//     await User.findByIdAndDelete(
//       req.params.id 
//     );
//     res.send("Success");
//   } catch(err) {
//     res.status(500).json(err);
//   }
// });

// // GET user
// router.get('/:id', async(req, res) => {

//   try{
//     const user = await User.findById(req.params.id);
//     res.status(200).json(user);
//   } catch(err) {
//     res.status(500).json(err);
//   }
// });

// /* GET users listing. */
// router.get("/", async(req, res)=>{
//   try{
//       const users = await User.find();
//       res.status(200).json(users);
//   }catch(err){
//       res.status(500).json(err);
//   }
// });

module.exports = router;