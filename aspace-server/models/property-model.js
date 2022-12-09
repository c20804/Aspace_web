const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title:{
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    image: {
        type: String,
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    postalCode: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    amenities: {
        type: String,
    },
    unAvailable: {
        type: [Date],
    },
    occupancy: {
        type: Number,
        required: true,
    },
    comment: {
        type: [String],
        default: [],
    }
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;