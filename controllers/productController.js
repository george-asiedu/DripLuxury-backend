const catchErrorAsync = require('../utils/catchErrorAsync')
const appError = require('../utils/appError')
const product = require('../db/models/products')
const AppError = require("../utils/appError");

const createSingleProduct = catchErrorAsync(async (req, res, next) => {
    const productsData = req.body

    const newProduct = await product.create(productsData)

    if (!newProduct) return next(new appError('failed to create product'), 400)

    const result = newProduct.toJSON()
    delete result.deletedAt

    return res.status(201).json({
        status: 'Product created successfully',
        data: result
    })
})

const createManyProduct = catchErrorAsync(async (req, res, next) => {
    const productsData = req.body

    if (!Array.isArray(productsData) || productsData.length === 0) {
        return next(new appError('Please provide an array of products', 400))
    }

    const newProducts = await product.bulkCreate(productsData)

    if (!newProducts) return next(new appError('Failed to create products', 400))

    const result = newProducts.map(prod => {
        const productJSON = prod.toJSON()
        delete productJSON.deletedAt
        return productJSON
    })

    return res.status(201).json({
        status: 'Products created successfully',
        result: result.length,
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
    const productData = req.body

    const result = await product.findOne({ where: { id: id } })
    if(!result) return next(new AppError('Invalid product id'), 400)

    await result.update(productData)

    return res.status(200).json({
        status: 'Product updated successfully',
        data: result
    })
})

const deleteProduct = catchErrorAsync(async (req, res, next) => {
    const { id } = req.params

    const result = await product.destroy({ where: { id: id }, force: true })
    if(!result) return next(new AppError('failed to delete product'), 400)

    return res.status(200).json({
        status: 'Product deleted successfully',
        data: null
    })
})

module.exports = {
    createSingleProduct ,
    createManyProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}