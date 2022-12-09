const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// import pkg from 'validator';
// const { isEmail } = pkg;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email address is required!'],
        // validate: [isEmail, 'Invalid email!']
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        requred: true,
    },
    isHost: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
);

// mongoose schema middleware
userSchema.pre("save", async function(next) {
    if (this.isModified("password") || this.isNew) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } else {
        return next();
    }
});

// password compare
userSchema.methods.comparePassword = function comparePassword (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return cb(err, isMatch);
        }
        cb(null, isMatch);
    });
  };

module.exports = mongoose.model("User", userSchema);