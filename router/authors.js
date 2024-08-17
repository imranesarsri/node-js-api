const express = require('express')
const authors = require('../data/authors.json')
const validationCreateAuthor = require('../validation/authors/validationCreateAuthor')
const validationUpdateAuthor = require('../validation/authors/validationUpdateAuthor')
const router = express.Router()


/** 
 * @desc Get all authors
 * @route /authors
 * @method GET 
 * @access public
 */

router.get('/', (req, res) => {
    res.json(authors)
})


/** 
 * @desc Get author by id
 * @route /:id
 * @method GET 
 * @access public
 */

router.get('/:id', (req, res) => {
    const author = authors.find(b => b.id === parseInt(req.params.id))
    if (author) {
        res.status(200).json(author)
    } else {
        res.status(404).json({ message: 'author not found' })
    }
})


/** 
 * @desc Greate new author
 * @route /create
 * @method GET 
 * @access public
 */

router.post('/create', (req, res) => {
    const { error } = validationCreateAuthor(req.body)
    if (error) {
        res.status(400).json({ message: error.message })
    } else {
        res.status(201).json({ message: 'created successfull' })
    }
})


/** 
 * @desc Update a author by id
 * @route /update/:id
 * @method PUT 
 * @access public
 */

router.put('/update/:id', (req, res) => {
    const author = authors.find(b => b.id == parseInt(req.params.id))
    if (author) {
        const { error } = validationUpdateAuthor(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            res.status(201).json({ message: 'Updated successfull' })
        }
    } else {
        res.status(404).json({ message: 'The author you are trying to edit does not exist.' })
    }
})



/** 
 * @desc Delete a author by id
 * @route /delete/:id
 * @method DELETE 
 * @access public
 */

router.delete('/delete/:id', (req, res) => {
    const author = authors.find(b => b.id == parseInt(req.params.id))
    if (author) {
        res.status(201).json({ message: 'deleted successfull' })
    } else {
        res.status(404).json({ message: 'The author you are trying to delet does not exist.' })
    }
})



module.exports = router

