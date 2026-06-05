const express = require('express');
const router = express.Router();
const balanceController = require('../controller/balancecontroller')
const transactionController = require('../controller/transactioncontroller')
const {validateBalance} = require('../middlewares/validatemiddleware');
const authMiddleware = require('../middlewares/authmiddleware');

router.get('/balance', authMiddleware, balanceController.getBalance);
router.get('/topup', validateBalance ,authMiddleware, balanceController.updateBalance)

router.get('/transaction/history', authMiddleware, transactionController.getTransaction)
router.get('/transaction', authMiddleware, transactionController.postTransaction)

module.exports = router;