const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/add-user', userController.addNewUser);



module.exports = router;