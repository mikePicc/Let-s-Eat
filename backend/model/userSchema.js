// Create new user schema
// Purpose to create a structure data that store in mongoose db

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let user = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { collection: "User" }
);

module.exports = mongoose.model("User", user)