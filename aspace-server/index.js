const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const registerRoute = require("./routes").register;
const propertiesRoute = require("./routes").properties;
const reservationsRoute = require("./routes").reservations;
const loginRoute = require("./routes").login;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

// connect to DB
mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUniFiedTopology: true,
    })
    .then(()=> {
        console.log("Connect to Mongo Altas");
    })
    .catch((e) => {
        console.log(e);
    })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", registerRoute);
app.use("/api/user", loginRoute);
app.use("/properties", passport.authenticate("jwt", { session: false }), propertiesRoute);
app.use("/reservations", reservationsRoute);

app.listen(8080, () => {
    console.log("Server running on port 8080.");
});
