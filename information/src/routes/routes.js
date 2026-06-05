const express = require('express');
const router = express.Router();
const bannersController = require('../controller/bannercontroller');
const servicesController = require('../controller/servicescontroller')
const authMiddleware = require('../middlewares/authmiddleware');

router.get('/banner', bannersController.getBanner);
router.get('/services', authMiddleware ,servicesController.getServices);

module.exports = router;