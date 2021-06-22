const express = require('express')
const router = express.Router();
const tourController = require('../controllers/tourController')
//tour routers
router.param('id', tourController.checkId)
// create a checkbody middleware function: check if the body contains name property and price property


router.get('/', tourController.getAllTours)
router.get('/:id', tourController.getSingleTour)
router.post('/', tourController.checkBody, tourController.createTour)
router.patch('/:id', tourController.updateTour)
router.delete('/:id', tourController.deleteTour)

module.exports = router