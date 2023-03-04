const express = require('express')
const router = express.Router()

// Get functions from restaurantController.js
const {
    getRestaurants,
    getRestaurant,
    createRestaurant,
    deleteRestaurant,
    updateRestaurant
} = require('../controllers/restaurantController.js')

// User must be logged in for certain functions
// Currently accepts all users regardless of role
const middlewareCheckIsLoggedInFunction = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.send({ "message": "Please login for this action" })
    } else {
        next();
    }
};

// GET all restaurants
router.get('/', getRestaurants)

// GET a single restaurant
router.get('/:id', getRestaurant)

// POST a new restaurant
router.post('/', middlewareCheckIsLoggedInFunction, createRestaurant)

// DELETE a restaurant
router.delete('/:id', middlewareCheckIsLoggedInFunction, deleteRestaurant)

// UPDATE a restaurant
router.patch('/:id', middlewareCheckIsLoggedInFunction, updateRestaurant)

module.exports = router