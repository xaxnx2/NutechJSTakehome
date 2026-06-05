const express = require('express');
const router = express.Router();
const authController = require('../controller/authcontroller');
const userController = require('../controller/usercontroller');
const {validateLogin, validateRegister} = require('../middlewares/validatemiddleware');
const authMiddleware = require('../middlewares/authmiddleware');
const validateMiddleware = require('../middlewares/validatemiddleware');

router.post('/registration', validateRegister ,authController.register);
router.post('/login', validateLogin, authController.login);

router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile/update', authMiddleware, userController.updateProfile);
router.put('/profile/image', authMiddleware, userController.updateProfileImage);

module.exports = router;