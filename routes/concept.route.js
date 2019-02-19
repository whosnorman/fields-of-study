const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const concept_controller = require('../controllers/concept.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', concept_controller.test);
module.exports = router;
