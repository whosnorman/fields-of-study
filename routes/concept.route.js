const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const concept_controller = require('../controllers/concept.controller');

router.get('/01', concept_controller.first);
router.get('/02', concept_controller.second);

module.exports = router;
