// Router enables variable HTTP Paths to be mapped per request. Ex: GET /home and distinctly call respective POST /home
const router = require('express').Router();

// API endpoints for server to fetch and POST data
router.use('/allergies', require('./allergies')); 
router.use('/chronic-health', require('./chronicHealth'));
//router.use('/doctor-visit', require('./doctorVisit'));
//router.use('/drug-prescription', require('./drugPrescriptions'));
//router.use('/first-responder', require('./firstResponder'));
//router.use('/hospitalization-visit', require('./hospitalizationVisit'));
//router.use('/lab-results', require('./labResults'));
router.use('/users', require('./users'));

module.exports = router;