const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
    },
    // host: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Property",
    // },
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    date: {
        type: Date,
        required: true,
    },
    guestNumber: {
        type: Number,
        required: true,
    }
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;