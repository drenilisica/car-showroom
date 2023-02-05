const router = require('express').Router()
const {showUsers, registerNewUsers, deleteUser, loginUser} = require('../controllers/userController')

router.get('/', showUsers)

router.post('/', registerNewUsers)

router.post('/login', loginUser)

router.delete('/:id', deleteUser)

module.exports = router;