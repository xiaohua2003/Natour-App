const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


//users routes
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getSingleUser)
router.post('/', userController.createUser)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router