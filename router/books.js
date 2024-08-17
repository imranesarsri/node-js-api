const express = require('express')
const books = require('../data/books.json')
const validationCreateBook = require('../validation/books/validationCreateBook')
const validationUpdateBook = require('../validation/books/validationUpdateBook')
const router = express.Router()


/** 
 * @desc Get all books
 * @route /books
 * @method GET 
 * @access public
 */

router.get('/', (req, res) => {
    res.json(books)
})


/** 
 * @desc Get book by id
 * @route /:id
 * @method GET 
 * @access public
 */

router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (book) {
        res.status(200).json(book)
    } else {
        res.status(404).json({ message: 'book not found' })
    }
})


/** 
 * @desc Greate new book
 * @route /create
 * @method GET 
 * @access public
 */

router.post('/create', (req, res) => {
    const { error } = validationCreateBook(req.body)
    if (error) {
        res.status(400).json({ message: error.message })
    } else {
        res.status(201).json({ message: 'created successfull' })
    }
})


/** 
 * @desc Update a book by id
 * @route /update/:id
 * @method PUT 
 * @access public
 */

router.put('/update/:id', (req, res) => {
    const book = books.find(b => b.id == parseInt(req.params.id))
    if (book) {
        const { error } = validationUpdateBook(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            res.status(201).json({ message: 'Updated successfull' })
        }
    } else {
        res.status(404).json({ message: 'The book you are trying to edit does not exist.' })
    }
})



/** 
 * @desc Delete a book by id
 * @route /delete/:id
 * @method DELETE 
 * @access public
 */

router.delete('/delete/:id', (req, res) => {
    const book = books.find(b => b.id == parseInt(req.params.id))
    if (book) {
        res.status(201).json({ message: 'deleted successfull' })
    } else {
        res.status(404).json({ message: 'The book you are trying to delet does not exist.' })
    }
})



module.exports = router

