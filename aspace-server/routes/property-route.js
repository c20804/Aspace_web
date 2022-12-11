const router = require("express").Router();
const Property = require("../models").propertyModel;
// const Reservation = require("../models").reservationModel;
const propertyValidation = require("../validation").propertyValidation;

router.use((req, res, next) => {
    console.log("A request is coming into api...");
    next();
});

// //try to get all but failed
router.get("/listing", (req, res) => {
    Property.find({})
      .populate("host", ["name", "email"])
      .then((property) => {
        res.send(property);
      })
      .catch(() => {
        res.status(500).send("Error!! Cannot get property!!");
      });
  });

// get host's own properties
router.get("/host/:_host_id", (req, res) => {
  let { _host_id } = req.params;
  Property.find({ host: _host_id })
    .populate("host", ["name", "email"])
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send("Cannot get property data.");
    });
});


// try to get guests favorites
router.get("/guest/:_guest_id", (req, res) => {
  let { _guest_id } = req.params;
  Property.find({ addFavBy: _guest_id })
    .populate("host", ["name", "email"])
    .then((properties) => {
      res.status(200).send(properties);
    })
    .catch(() => {
      res.status(500).send("Cannot get data.");
    });
});

// // try to add guests favorites
// router.patch("/guest/:_guest_id", (req, res) => {
//   let { _guest_id } = req.params;
//   User.findOneAndUpdate({ _id: _guest_id })
//     .populate("host", ["name", "email"])
//     .then((properties) => {
//       res.status(200).send(properties);
//     })
//     .catch(() => {
//       res.status(500).send("Cannot get data.");
//     });
// });

// // get guests reserved propertes - try reservation
// router.get("/guest/:_guest_id", (req, res) => {
//   let { _guest_id } = req.params;
//   Reservation.find({ guest: _guest_id })
//     .populate("host", ["name", "email"])
//     .then((properties) => {
//       res.status(200).send(properties);
//     })
//     .catch(() => {
//       res.status(500).send("Cannot get data.");
//     });
// });

  //get one
router.get("/:_id", (req, res) => {
let { _id } = req.params;
Property.findOne({ _id })
    .populate("host", ["email"])
    .then((property) => {
    res.send(property);
    })
    .catch((e) => {
    res.send(e);
    });
});

// Create
router.post("/", async (req, res) => {
    // validate the inputs before making a new course
    const { error } = propertyValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let { title, type, price, image, city, state, address, postalCode, description, amenities} = req.body;
    if (req.user.isGuest()) {
      return res.status(400).send("Only host can post a new property.");
    }
  
    let newProperty = new Property({
      host: req.user._id,
      title,
      type,
      price,
      image,
      city,
      state,
      address,
      postalCode,
      description,
      amenities,
    });
  
    try {
      await newProperty.save();
      res.status(200).send("New property has been saved.");
    } catch (err) {
      res.status(400).send("Cannot save property.");
    }
  });

// just try
// router.post("/reservation/:_propertyID", async(req, res) => {

// });



// edit property
router.patch("/:_id", async (req, res) => {
// validate the inputs before making a new one
const { error } = propertyValidation(req.body);
if (error) return res.status(400).send(error.details[0].message);

let { _id } = req.params;
let property = await Property.findOne({ _id });
if (!property) {
    res.status(404);
    return res.json({
    success: false,
    message: "Property not found.",
    });
}

if (property.host.equals(req.user._id) || req.user.isAdmin()) {
    Property.findOneAndUpdate({ _id }, req.body, {
    new: true,
    runValidators: true,
    })
    .then(() => {
        res.send("Property updated.");
    })
    .catch((e) => {
        res.send({
        success: false,
        message: e,
        });
    });
} else {
    res.status(403);
    return res.json({
    success: false,
    message:
        "Only the host of this property or web admin can edit this property.",
    });
}
});

// delete property
router.delete("/:_id", async (req, res) => {
    let { _id } = req.params;
    let property = await Property.findOne({ _id });
    if (!property) {
        res.status(404);
        return res.json({
        success: false,
        message: "Property not found.",
        });
    }

    if (property.host.equals(req.user._id) || req.user.isAdmin()) {
        Property.deleteOne({ _id })
          .then(() => {
            res.send("Property deleted.");
        })
        .catch((e) => {
            res.send({
            success: false,
            message: e,
            });
        });
    } else {
        res.status(403);
        return res.json({
        success: false,
        message:
            "Only the host of this property or web admin can delete this property.",
        });
    };
  });

module.exports = router;