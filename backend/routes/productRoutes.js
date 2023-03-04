const express = require('express')
const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController')

const router = express.Router()

// GET all products
router.get('/', getProducts)

// GET a product
router.get('/:id', getProduct)

// POST a product
router.post('/', createProduct)

// DELETE a product
router.delete('/:id', deleteProduct)

// UPDATE a product
router.patch('/:id', updateProduct)

module.exports = router