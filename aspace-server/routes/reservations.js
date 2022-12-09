var express = require('express');
var router = express.Router();
const Reservation = require("../models").reservationModel;
const Property = require("../models").propertyModel;

// Create
router.post('/', async(req, res) => {
  const userID = req.query.userID;
  const propertyId = req.body.propertyId;
  // const userID = req.params.userID;
  const newReservation = new Reservation({ 
    propertyId: propertyId,
    userId: userID, 
    date: new Date(req.body.date),
    guestNumber: req.body.guestNumber,
  });
  try{
    const savedReservation = await newReservation.save();

    try {
      await Property.findByIdAndUpdate(propertyId, {
        $push: { unAvailable: savedReservation.date },
      });
    } catch (err) {
      res.status(400).send("Property not updated.");
    }

    res.status(200).json(savedReservation);
  } catch(err) {
      res.status(400).send("Reservation not saved.");
  }
});

// // Update
// router.put('/:id', async(req, res) => {

//   try{
//     const updatedReservation = await Reservation.findByIdAndUpdate(
//       req.params.id, 
//       { $set: req.body}, 
//       { new:true }
//     );
//     res.send("Success");
//   } catch(err) {
//     res.status(500).json(err);
//   }
// });

// Delete
router.delete('/:id', async(req, res) => {

  try{
    const deletedReservation = await Reservation.findByIdAndDelete( req.params.id );
    const propertyId = deletedReservation.propertyId;
    try {
      await Property.findByIdAndUpdate(propertyId, {
        $pull: { unAvailable: deletedReservation.date },
      });
    } catch (err) {
      res.send(err);
    }
    res.send("Success");
  } catch(err) {
    res.status(500).json(err);
  }
});

// GET a reservation
router.get('/:id', async(req, res) => {

  try{
    const reservation = await Reservation.findById(req.params.id);
    res.status(200).json(reservation);
  } catch(err) {
    res.status(500).json(err);
  }
});

// GET all reservations by user
router.get('/', async(req, res) => {
  const userID = req.query.userID;
  console.log(userID);
  try{
    const reservations = await Reservation.find({
      "user": userID
    });
    res.status(200).json(reservations);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;