const express = require('express')
const authors = require('../data/authors.json')
const validationCreateAuthor = require('../validation/authors/validationCreateAuthor')
const validationUpdateAuthor = require('../validation/authors/validationUpdateAuthor')
const { Author } = require('../Models/Author')
const router = express.Router()

/** 
 * @desc Get all authors
 * @route /authors
 * @method GET 
 * @access public
 */

router.get('/', async (req, res) => {
    try {
        const allAuthor = await Author.find().sort({ firstName: -1 }).select('firstName lastName')
        // const allAuthor = await Author.find().sort({ firstName: 1 }).select(' -image -_id')
        res.status(200).json(allAuthor)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})


/** 
 * @desc Get author by id
 * @route /:id
 * @method GET 
 * @access public
 */

router.get('/:id', async (req, res) => {
    try {
        const getAuthorByID = await Author.findById(req.params.id)
        if (getAuthorByID) {
            res.status(200).json(getAuthorByID)
        } else {
            res.status(404).json({ message: 'author not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


/** 
 * @desc Greate new author
 * @route /create
 * @method GET 
 * @access public
 */

router.post('/create', async (req, res) => {
    const { error } = validationCreateAuthor(req.body)
    if (error) {
        res.status(400).json({ message: error.message })
    } else {

        try {
            const author = new Author(req.body)
            await author.save()
            res.status(201).json({ message: 'created successfull' })

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
})


/** 
 * @desc Update a author by id
 * @route /update/:id
 * @method PUT 
 * @access public
 */

router.put('/update/:id', async (req, res) => {
    const { error } = validationUpdateAuthor(req.body)
    if (error) {
        res.status(400).json({ message: error.message })
    }

    try {
        const author = await Author.findByIdAndUpdate(req.params.id, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nationality: req.body.nationality,
                age: req.body.age,
                image: req.body.image,
            }
        }, { new: true })
        if (author) {
            res.status(200).json(author)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})



/** 
 * @desc Delete a author by id
 * @route /delete/:id
 * @method DELETE 
 * @access public
 */

router.delete('/delete/:id', async (req, res) => {
    try {
        const ID = req.params.id
        const author = await Author.findById(ID)
        if (author) {
            await Author.findByIdAndDelete(ID)
            res.status(200).json({ message: 'deleted successfull' })
        } else {
            res.status(404).json({ message: 'Author not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



module.exports = router

