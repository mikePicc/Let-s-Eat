// Product schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    mainIngredients: {
      type: [String],
      maxlength: 20
    },
    // Category: (e.g. Appetizer, Salad, Mains/Entree, Dessert, Beverage)
    category: {
      type: String,
      required: true,
      maxlength: 20,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 200,
    },
    img: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    extraOptions: {
      type: [
        {
          // Ability to add extra toppings/modifications along with associated price
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  },
  { collection: "Product" }
  // Automatically adds a timestamp whenever the user adds or modifies an item
  //{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema)