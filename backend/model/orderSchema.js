// Order schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const OrderSchema = new Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required:true
    },
    orderItems: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true }
        }
      ],
      required: true
    },
    cardInfo: {
      type: {
        cardNumber: { type: String, required: true },
        cardHolder: { type: String, required: true },
        expiryDate: { type: String, required: true },
        cvv: { type: String, required: true }
      },
      }
  },
  // Automatically adds a timestamp whenever the user adds or modifies an item
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema)