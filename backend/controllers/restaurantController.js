// Built following a MERN Stack Tutorial by The Net Ninja on YouTube
// https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE

const Restaurant = require('../model/restaurantSchema.js')
const mongoose = require('mongoose')

// Get all restaurants
const getRestaurants = async (req, res) => {
    const restaurants = await Restaurant.find({}).sort({ createdAt: -1 })

    // Set response status to 200 (success) and pass a json of the restaurants
    res.status(200).json(restaurants)
}

// Get a single restaurant
const getRestaurant = async (req, res) => {
    const { id } = req.params

    // Check if the given id is a potential MongoDB id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such restaurant' })
    }

    // Fetch restaurant with the matching id
    const restaurant = await Restaurant.findById(id)

    // If no match
    if (!restaurant) {
        return res.status(404).json({ error: 'No such restaurant' })
    }

    res.status(200).json(restaurant)
}

// Create a new restaurant
// NOTE: If you update the schema, be sure to update this function to match
const createRestaurant = async (req, res) => {
    // Build object based on request
    const { restaurantName, restaurantAddress, openHours, description, cuisines,
        priceRange, website, phoneNo, rating, bannerImg } = req.body

    // Try to create a restaurant with the object variables
    try {
        const restaurant = await Restaurant.create({
            restaurantName, restaurantAddress, openHours, description, cuisines,
            priceRange, website, phoneNo, rating, bannerImg
        })
        res.status(200).json(restaurant)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete a restaurant. Flow is similar to singular get.
const deleteRestaurant = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such restaurant' })
    }

    const restaurant = await Restaurant.findOneAndDelete({ _id: id })

    if (!restaurant) {
        return res.status(404).json({ error: 'No such restaurant' })
    }

    res.status(200).json(restaurant)
}

// Update a restaurant. Flow is similar to singular get.
const updateRestaurant = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such restaurant' })
    }

    // Update by laying out the arguments in the request (...req.body)
    // restaurant is updated by the new updated restaurant if successful (new: true)
    const restaurant = await Restaurant.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true })

    if (!restaurant) {
        return res.status(404).json({ error: 'No such restaurant' })
    }

    res.status(200).json(restaurant)
}

// Export these functions
module.exports = {
    getRestaurants,
    getRestaurant,
    createRestaurant,
    deleteRestaurant,
    updateRestaurant
}