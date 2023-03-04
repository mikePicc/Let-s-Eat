// See comments on restaurantController.js for more info

const Order = require('../model/orderSchema.js')
const mongoose = require('mongoose')

// Get all orders
const getOrders = async (req, res) => {
    const orders = await Order.find({}).sort({ createdAt: -1 })

    res.status(200).json(orders)
}

// get a single order
const getOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Order does not exist' })
    }

    const order = await Order.findById(id)

    if (!order) {
        return res.status(404).json({ error: 'Order does not exist' })
    }

    res.status(200).json(order)
}

// create a new order
const createOrder = async (req, res) => {
    const { customer, address, orderItems, total, status, method, cardInfo } = req.body

    try {
        const order = await Order.create({
            customer,
            address,
            orderItems,
            total,
            status,
            method,
            cardInfo,
        });
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete an order
const deleteOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Order does not exist' })
    }

    const order = await Order.findOneAndDelete({ _id: id })

    if (!order) {
        return res.status(404).json({ error: 'Order does not exist' })
    }

    res.status(200).json(order)
}

// update an order
const updateOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Order does not exist' })
    }

    const order = await Order.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!order) {
        return res.status(404).json({ error: 'Order does not exist' })
    }

    res.status(200).json(order)
}

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder
}