const Concept = require('../models/concept.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
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
