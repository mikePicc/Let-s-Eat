const express = require('express')
const {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder
} = require('../controllers/orderController')

const router = express.Router()

// GET all orders
router.get('/', getOrders)

// GET an order
router.get('/:id', getOrder)

// POST an order
router.post('/', createOrder)

// DELETE an order
router.delete('/:id', deleteOrder)

// UPDATE an order
router.patch('/:id', updateOrder)

module.exports = router