const router = require('express').Router();
let patient = require('../models/patient.model');
const bodyparser = require('body-parser');
const https = require('https');

router.use(bodyparser.urlencoded({ extended: true }));

var chemical = "acenocoumarol";

router.post('/med', (req, res) => {

    chemical = req.body.chemical;

    var url = `https://api.pharmgkb.org/v1/data/chemical?name=${chemical}`;
    var temp = [];
    https.get(url, (response) => {
        response.on('data', (data) => {
            tmep = JSON.parse(data)['data'][0]['altNames']['trade'];
        });
    });


    res.redirect('/');

});

router.delete('/:id', async(req, res) => {
    await patient.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

router.route('/').post((req, res) => {


    const name = req.body.name;
    const phone_number = req.body.phone_number;
    const email = req.body.email;
    const birth_date = req.body.birth_date;
    const gender = req.body.gender;
    const social_status = req.body.social_status;
    const location = req.body.location;

    const newpatient = new patient({ name, phone_number, gender, email, social_status, birth_date, location });

    newpatient.save()
        .then(() => res.redirect('/'))
        .catch(err => res.status(400).json('error:' + err));
});

router.put('/:id', async(req, res) => {

    await patient.updateOne({ _id: req.params.id }, req.body)
    res.redirect('/')

})

module.exports = router;