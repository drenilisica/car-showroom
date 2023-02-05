const router = require('express').Router();
const {showCars, registerNewCar, buyCar} = require('../controllers/carController')

router.get('/', showCars)

router.post('/', registerNewCar)

router.delete('/:id', buyCar)

module.exports = router;