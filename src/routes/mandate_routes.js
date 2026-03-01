const express = require('express');
const router = express.Router();
const mandateController = require('../controllers/mandate_controller');

router.post('/createMandate', mandateController.createMandate);

module.exports = router;