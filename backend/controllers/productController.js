// See comments on restaurantController.js for more info

const Product = require('../model/productSchema.js')
const mongoose = require('mongoose')

// Get all products
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 })
    res.status(200).json(products)
}

// get a product
const getProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Product does not exist' })
    }

    const product = await Product.findById(id)

    if (!product) {
        return res.status(404).json({ error: 'Product does not exist' })
    }

    res.status(200).json(product)
}

// create a product
const createProduct = async (req, res) => {
    const { title, restaurant, mainIngredients, category, desc, img, prices, extraOptions } = req.body

    try {
        const product = await Product.create({
            title, restaurant, mainIngredients, category, desc, img, prices, extraOptions
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Product does not exist' })
    }

    const product = await Product.findOneAndDelete({ _id: id })

    if (!product) {
        return res.status(404).json({ error: 'Product does not exist' })
    }

    res.status(200).json(product)
}

// update a product
const updateProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Product does not exist' })
    }

    const product = await Product.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!product) {
        return res.status(404).json({ error: 'Product does not exist' })
    }

    res.status(200).json(product)
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
}