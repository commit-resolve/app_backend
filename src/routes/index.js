const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/test', controller.test);
router.get('/transaction', controller.transaction);
router.post('/create_mandate',controller.createMandate)

module.exports = router;