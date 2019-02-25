const Concept = require('../models/concept.model');
const path = require('path');

//Simple version, without validation or sanitation
exports.first = function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../views/concept-01.html'));
};

exports.second = function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../views/concept-02.html'));
};

exports.concept_create = function (req, res) {
    let concept = new Concept(
        {
            name: req.body.name,
            position: req.body.position,
            fieldOfStudy: req.body.fieldOfStudy,
        }
    );

    concept.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};
