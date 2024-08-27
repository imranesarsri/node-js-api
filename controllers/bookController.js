const asyncHandler = require('express-async-handler')
const { Book, validationCreateBook, validationUpdateBook } = require('../Models/Book')


/** 
 * @desc Get all Books
 * @route /Books
 * @method GET 
 * @access public
 */

const getAllBooks = asyncHandler(async (req, res) => {
    try {
        const { price, cover, pageNumber } = req.query;

        // Filter of price
        const query = {};
        if (price) {
            query.price = { $eq: price };
        }

        // Filter of cover
        if (cover) {
            if (cover === 'hand') {
                query.cover = { $eq: 'hand cover' };
            } else if (cover === 'soft') {
                query.cover = { $eq: 'soft cover' };
            } else {
                return res.status(400).json({ message: 'Invalid cover type. Please enter "hand" or "soft".' });
            }
        }

        // Pagination setup
        const booksPerPage = 2;
        const page = parseInt(pageNumber, 10) || 1; // Default to page 1 if not provided

        // Calculate the total number of books and pages
        const totalBooks = await Book.countDocuments(query);
        const totalPages = Math.ceil(totalBooks / booksPerPage);

        // Check if the requested page exists
        if (page > totalPages) {
            return res.status(404).json({ message: `Page number ${page} does not exist. The last available page is ${totalPages}.` });
        }

        // Calculate pagination values
        const skipBooks = (page - 1) * booksPerPage;

        // Fetch the books for the requested page
        //? Comparison Query Operators
        //? [ $eq / $ne ] [ $lt / $lte ] [ $gt / $gte ] [ $in / $nin ]
        const allBooks = await Book
            .find(query)
            .sort({ title: 1 })
            .populate('author', ['_id', 'firstName', 'lastName'])
            .skip(skipBooks)
            .limit(booksPerPage);

        if (allBooks.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }

        // Include pagination details in the response
        res.status(200).json({
            totalBooks,
            totalPages,
            currentPage: page,
            booksPerPage,
            books: allBooks
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})


/** 
 * @desc Get Book by id
 * @route /books/:id
 * @method GET 
 * @access public
 */

const getBookByID = asyncHandler(
    async (req, res) => {
        const ID = req.params.id
        const getBookByID = await Book.findById(ID)
        if (getBookByID) {
            res.status(200).json(getBookByID)
        } else {
            res.status(404).json({ message: 'Book not found' })
        }
    }
)


/** 
 * @desc Greate new Book
 * @route /books/create
 * @method GET 
 * @access private (only admin)
 */

const createBook = asyncHandler(
    async (req, res) => {
        const { error } = validationCreateBook(req.body)
        if (error) {
            res.status(400).json({ message: error.details[0].message })
        } else {
            const book = new Book(req.body)
            await book.save()
            res.status(201).json(book)
        }
    }
)


/** 
 * @desc Update a Book by id
 * @route /books/update/:id
 * @method PUT 
 * @access private (only admin)
 */

const updateBook = asyncHandler(
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
)



/** 
 * @desc Delete a Book by id
 * @route /books/delete/:id
 * @method DELETE 
 * @access private (only admin)
 */

const deleteBook = asyncHandler(
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
)



module.exports = {
    getAllBooks,
    getBookByID,
    createBook,
    updateBook,
    deleteBook
}