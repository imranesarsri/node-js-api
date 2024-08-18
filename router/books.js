const express = require('express')
const validationCreateBook = require('../validation/books/validationCreateBook')
const validationUpdateBook = require('../validation/books/validationUpdateBook')
const { Book } = require('../Models/Book')
const router = express.Router()
const asyncHandler = require('express-async-handler')

/** 
 * @desc Get all Books
 * @route /Books
 * @method GET 
 * @access public
 */

router.get('/', asyncHandler(
    async (req, res) => {
        const allBook = await Book.find().sort({ title: 1 }).populate("author", ['_id', 'firstName', 'lastName'])
        res.status(200).json(allBook)
    }
))


/** 
 * @desc Get Book by id
 * @route /:id
 * @method GET 
 * @access public
 */

router.get('/:id', asyncHandler(
    async (req, res) => {
        const ID = req.params.id
        const getBookByID = await Book.findById(ID)
        if (getBookByID) {
            res.status(200).json(getBookByID)
        } else {
            res.status(404).json({ message: 'Book not found' })
        }
    }
))


/** 
 * @desc Greate new Book
 * @route /create
 * @method GET 
 * @access public
 */

router.post('/create', asyncHandler(
    async (req, res) => {
        const { error } = validationCreateBook(req.body)
        if (error) {
            res.status(400).json({ message: error.details[0].message })
        } else {
            const book = new Book(req.body)
            await book.save()
            res.status(201).json({ message: 'created successfull' })
        }
    }
))


/** 
 * @desc Update a Book by id
 * @route /update/:id
 * @method PUT 
 * @access public
 */

router.put('/update/:id', asyncHandler(
    async (req, res) => {
        const { error } = validationUpdateBook(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
        }

        const ID = req.params.id
        const book = await Book.findByIdAndUpdate(ID, {
            $set: {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                price: req.body.price,
                cover: req.body.cover,
            }
        }, { new: true })
        if (book) {
            res.status(200).json(book)
        }

    }
))



/** 
 * @desc Delete a Book by id
 * @route /delete/:id
 * @method DELETE 
 * @access public
 */

router.delete('/delete/:id', asyncHandler(
    async (req, res) => {
        const ID = req.params.id
        const book = await Book.findById(ID)
        if (book) {
            await Book.findByIdAndDelete(ID)
            res.status(200).json({ message: 'deleted successfull' })
        } else {
            res.status(404).json({ message: 'Book not found' })
        }
    }
))

module.exports = router

