var express = require('express');
var router = express.Router();
const Property = require("../models").propertyModel;

// Create
router.post('/', async(req, res) => {
  const newProperty = new Property(req.body);
  if (!req.user.isHost) {
    return res.status(400).send("Only host can post a new property.");
  }
  
  try{
      const savedProperty = await newProperty.save();
      res.status(200).send({
      msg: "success",
      savedObject: savedProperty,
      });
  } catch(err) {
      res.status(400).send("User not saved.");
  }
});

// Update
router.put('/:id', async(req, res) => {

  try{
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body}, 
      { new:true }
    );
    res.send("Success");
  } catch(err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete('/:id', async(req, res) => {

  try{
    await Property.findByIdAndDelete(
      req.params.id 
    );
    res.send("Success");
  } catch(err) {
    res.status(500).json(err);
  }
});

// GET user
router.get('/:id', async(req, res) => {

  try{
    const user = await Property.findById(req.params.id);
    res.status(200).json(user);
  } catch(err) {
    res.status(500).json(err);
  }
});

/* GET users listing. */
router.get("/", async(req, res)=>{
  try{
      const properties = await Property.find();
      res.status(200).json(properties);
  }catch(err){
      res.status(500).json(err);
  }
});

module.exports = router;