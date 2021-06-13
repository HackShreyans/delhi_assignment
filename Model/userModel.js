const mongoose = require("mongoose");
const geocoder = require("../geoCoder");
const jwt = require("jsonwebtoken");

// create schema which is given
const userSchema = new mongoose.Schema({
  userid: {
    type: String,
    unique: true,
    required: true,
    maxlength: [10, "id must be less than 10 char"]
  },
  username: {
    type: String,
    required: true
  },
  dateofbirth: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: [true, "please add an adress"]
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    formattedAdress: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// here is geocoder middleware before saving the data
userSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.adress);
  this.location = {
    type: "point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAdress: loc[0].formattedAddress
  };

  this.adress = undefined;
  next();
});

module.exports = mongoose.model("Userdb", userSchema);
