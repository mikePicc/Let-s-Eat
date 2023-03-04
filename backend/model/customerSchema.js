// Customer schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        nickname: {
            type: String,
            required: false
        },
        dateOfBirth: {
            type: String,
            required: true
        },
        customerPhoneNumber: {
            type: String,
            required: true
        },
        customerAddress: {
            type: String,
            required: true
        },
        customerDescription: {
            type: String,
            required: false
        },
        profileImg: String,
        customerFavorites: {
            type: String,
            required: false
        },
    },
    { collection: "Customer" }
);

module.exports = mongoose.model("Customer", customerSchema)