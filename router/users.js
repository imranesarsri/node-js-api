const express = require('express');
const router = express.Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const { getAllUsers, updateUser, deleteUser } = require('../controllers/userController')


router.get('/', verifyTokenAndAdmin, getAllUsers)

router.put('/:id', verifyTokenAndAuthorization, updateUser);

router.delete('/:id', verifyTokenAndAuthorization, deleteUser)

module.exports = router;
