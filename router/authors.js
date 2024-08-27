const express = require('express')
const router = express.Router()
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const { getAllAuthors, getAuthorByID, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorController')


router.route('/')
    .get(getAllAuthors)
    .post(
        verifyTokenAndAdmin,
        createAuthor
    )

router.route('/:id')
    .get(getAuthorByID)
    .put(
        verifyTokenAndAdmin,
        updateAuthor
    )
    .delete(
        verifyTokenAndAdmin,
        deleteAuthor
    )


module.exports = router

