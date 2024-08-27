const asyncHandler = require('express-async-handler')
const { Author, validationCreateAuthor, validationUpdateAuthor } = require('../Models/Author')


/** 
 * @desc Get all authors
 * @route /authors/authors
 * @method GET 
 * @access public
 */

const getAllAuthors = asyncHandler(
    async (req, res) => {
        const allAuthor = await Author.find().sort({ firstName: -1 }).select('firstName lastName')
        res.status(200).json(allAuthor)
    }
)


/** 
 * @desc Get author by id
 * @route /authors/:id
 * @method GET 
 * @access public
 */

const getAuthorByID = asyncHandler(
    async (req, res) => {
        const ID = req.params.id
        const getAuthorByID = await Author.findById(ID)
        if (getAuthorByID) {
            res.status(200).json(getAuthorByID)
        } else {
            res.status(404).json({ message: 'author not found' })
        }
    }
)


/** 
 * @desc Greate new author
 * @route /authors/create
 * @method GET 
 * @access private (only admin)
 */

const createAuthor = asyncHandler(
    async (req, res) => {
        const { error } = validationCreateAuthor(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const author = new Author(req.body)
            await author.save()
            res.status(201).json(author)
        }
    }
)


/** 
 * @desc Update a author by id
 * @route /authors/update/:id
 * @method PUT 
 * @access private (only admin) 
 */

const updateAuthor = asyncHandler(
    async (req, res) => {
        const { error } = validationUpdateAuthor(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
        }

        const ID = req.params.id
        const author = await Author.findByIdAndUpdate(ID, {
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
    }
)


/** 
 * @desc Delete a author by id
 * @route /authors/delete/:id
 * @method DELETE 
 * @access private (only admin) 
 */

const deleteAuthor = asyncHandler(
    async (req, res) => {
        const ID = req.params.id
        const author = await Author.findById(ID)
        if (author) {
            await Author.findByIdAndDelete(ID)
            res.status(200).json({ message: 'deleted successfull' })
        } else {
            res.status(404).json({ message: 'Author not found' })
        }
    }
)


module.exports = {
    getAllAuthors,
    getAuthorByID,
    createAuthor,
    updateAuthor,
    deleteAuthor
}