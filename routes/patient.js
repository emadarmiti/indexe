const router = require('express').Router();
let patient = require('../models/patient.model');
const bodyparser = require('body-parser');
const https = require('https');

router.use(bodyparser.urlencoded({ extended: true }));

var chemical = "acenocoumarol";

router.post('/med', (req, res) => {

    chemical = req.body.chemical;

    var url = `https://api.pharmgkb.org/v1/data/chemical?name=${chemical}`;
    var x;
    https.get(url, (response) => {
        response.on('data', (data) => {
            x = (JSON.parse(data)['data'][0]['altNames']['trade']);
            res.render('meds', { xx: x })
        });
    });

});

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('3b6884e0a69b406f84edde115fb6f74f');

router.post('/news', (req, res) => {

    chemical = req.body.chemical;


    newsapi.v2.sources({
        category: 'health',
        language: 'en',
    }).then(x => {
        console.log(x.sources)
        res.render('news', { xx: x.sources })
    });


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