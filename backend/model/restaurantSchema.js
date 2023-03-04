// Create new restaurant schema
// Purpose to create a structure data that store in mongoose db
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
    {
        // Name of the restaurant
        restaurantName: {
            type: String,
            require: true
        },

        // Address of the restaurant
        restaurantAddress: {
            type: {
                // buildingNo is String to allow for extra info like apt or suite number
                buildingNo: String,
                street: String,
                city: String,
                state: String,
                country: String,
                zipcode: Number
            },
            require: true
        },

        // openHours is an array of daytime objects which also contains an array of days and times
        // (ex) openHours:  [
        //                  {days:[day0, day1], times:[ startHr, endHr, startMin, endMin]},
        //                  {days:[day2], times:[startHr, endHr, startMin, endMin]}
        //                  ]
        // This allows for a variety of open times. Days can share a set of times.
        // Break times are supported in this system too.
        // e.g. a restaurant that is open 11-21, but closed 14:30-17
        openHours: [{
            // I wanted to add a check to ensure that days are 0-6, but 
            // days: [day: {type: Number, min:0, max:6}]
            // didn't work so it's currently left unchecked right now
            days: [Number],
            times: [{
                startHr: {
                    type: Number,
                    min: 0, max: 23
                },
                endHr: {
                    type: Number,
                    min: 0, max: 23
                },
                startMin: {
                    type: Number,
                    min: 0, max: 59
                },
                endMin: {
                    type: Number,
                    min: 0, max: 59
                }
            }]
        }],

        description: String,

        // "tags" would've been more apt tbh
        // e.g. American, Chinese, Mexican, Breakfast, Sandwiches, Cafe, etc
        cuisines: [{
            type: String,
            lowercase: true
        }],

        // Represented as ($, $$, $$$, $$$$) by most restaurant databases. Generally...
        // $    =  $0 - $10
        // $$   = $10 - $20
        // $$$  = $20 - $50
        // $$$$ = $50 +
        priceRange: {
            type: Number,
            min: 1, max: 4
        },

        // If updated, could add more forms of contact like Twitter, Instagram, FaceBook, etc.
        website: String,

        phoneNo: String,

        // We don't have a review system in this build. The values I used to fill the db are from Google reviews
        rating: Number,

        // URL to the image (currently used for the card and the banner on their page)
        bannerImg: String,
    },

    // Collection name is Restaurant
    { collection: "Restaurant" }
);

module.exports = mongoose.model("Restaurant", restaurantSchema)