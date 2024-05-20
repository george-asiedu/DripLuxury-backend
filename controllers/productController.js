const catchErrorAsync = require('../utils/catchErrorAsync')
const appError = require('../utils/appError')
const product = require('../db/models/products')
const AppError = require("../utils/appError");

const createProduct = catchErrorAsync(async (req, res, next) => {
    const { name, productImage, price, description, category, tags, rating, dressStyle, colors, size } = req.body

    const newProduct = await product.create({
        name, productImage, price, description, category, tags, rating, dressStyle, colors, size
    })

    if (!newProduct) return next(new appError('failed to create product'), 400)

    const result = newProduct.toJSON()
    delete result.deletedAt

    return res.status(201).json({
        status: 'Product created successfully',
        data: result
    })
})

const getAllProducts = catchErrorAsync(async (req, res, next) => {
    const result = await product.findAll()
    if(!result) return next(new appError('No products found in database'), 400)
    return res.status(200).json({
        status: 'Products fetched successfully',
        result: result.length,
        data: result
    })
})

const getProductById = catchErrorAsync(async (req, res, next) => {
    const { id } = req.params
    const productId = await product.findByPk(id)

    if(!productId) return next(new AppError('Invalid product id'), 400)
    return res.status(200).json({
        status: 'Product found successfully',
        data: productId
    })
})

const updateProduct = catchErrorAsync(async (req, res, next) => {
    const { id } = req.params
    const { name, productImage, price, description, category, tags, rating, dressStyle, colors, size } = req.body

    const  result = await product.findOne({ where: id })
    if(!result) return next(new AppError('Invalid product id'), 400)

    result.name = name
    result.productImage = productImage
    result.price = price
    result.description = description
    result.category = category
    result.rating = rating
    result.dressStyle = dressStyle
    result.colors = colors
    result.size = size
    result.tags = tags

    const updatedResult = await result.save()

    return res.status(200).json({
        status: 'Product updated successfully',
        data: updatedResult
    })
})

const deleteProduct = catchErrorAsync(async (req, res, next) => {
    const { id } = req.params

    const result = await product.destroy({ where: id })
    if(!result) return next(new AppError('failed to delete product'), 400)

    return res.status(200).json({
        status: 'Product deleted successfully',
        data: null
    })
})

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct }