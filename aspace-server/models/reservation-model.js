const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
    },
    userId: {
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