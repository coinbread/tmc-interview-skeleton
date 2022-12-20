var express = require('express');
var router = express.Router();

var db = require('../data/db')

// API routes
router.get('/provinces', function(req, res, next) {
  res.json(db.provinces)
});

router.get('/cities', function(req, res, next) {
  res.json(db.cities)
});

router.get('/cities/:province',function(req, res, next) {
  const province = req.params.province;
  const arrCities = Array(...db.cities)
  const filteredCities = arrCities.filter((item, index) => { 
    return item.Province.toLowerCase() === province.toLowerCase() 
  })
  filteredCities.sort((a,b) => { 
    return b['Population(2016)'] - a['Population(2016)']
  })
  res.json(filteredCities)
});

module.exports = router;
