// import axios from "axios";
// const API_URL = "http://localhost:8080/api/reservations";

// const Reservation = require("../models/ReservationModel");
// const Property = require("../models/PropertyModel");
// const ObjectId = require("mongodb").ObjectId;

// const getUserReservations = async (req, res, next) => {
//     try {
//         const reservations = await Reservation.find({ user: ObjectId(req.user._id) });
//         res.send(reservations);
//     } catch (error) {
//         next(error)
//     }
// }

// const getReservation = async (req, res, next) => {
//     try {
//        const reservation = await Reservation.findById(req.params.id).populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt").orFail();
//         res.send(reservation);
//     } catch (err) {
//         next(err)
//     }
// }

// const createReservation = async (req, res, next) => {
//     try {
//         const { cartItems, reservationTotal, paymentMethod } = req.body;
//         if (!cartItems || !reservationTotal || !paymentMethod) {
//             return res.status(400).send("All inputs are required");
//         }

//         let ids = cartItems.map((item) => {
//             return item.propertytID;
//         })
//         let qty = cartItems.map((item) => {
//             return Number(item.quantity);
//         })

//         await Property.find({ _id: { $in: ids } }).then((properties) => {
//             properties.forEach(function (property, idx) {
//                 property.sales += qty[idx];
//                 property.save();
//             })
//         })

//         const reservation = new Reservation({
//             user: ObjectId(req.user._id),
//             reservationTotal: reservationTotal,
//             cartItems: cartItems,
//             paymentMethod: paymentMethod,
//         })
//         const createdReservation = await reservation.save();
//         res.status(201).send(createdReservation);

//     } catch (err) {
//         next(err)
//     }
// }


// const getReservations = async (req, res, next) => {
//     try {
//         const reservations = await Reservation.find({}).populate("user","-password").sort({ paymentMethod: "desc" });
//         res.send(reservations);
//     } catch (err) {
//         next(err)
//     }
// }


// module.exports = {getUserReservations, getReservation, createReservation, getReservations};