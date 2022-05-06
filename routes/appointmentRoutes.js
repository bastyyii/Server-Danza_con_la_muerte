const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/appointmentController');

router.get('/:month/:day/:year',
    appointmentController.getAppointment
);
router.post('/create/:month/:day/:year',
    appointmentController.createAppointment
);

module.exports = router;