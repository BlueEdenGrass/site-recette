const express = require('express');
const router = express.Router();
const db = require('../bdd.json');
const _ = require('lodash')
/* GET home page. */
router.all('/', function(req, res, next) {
  let _GET=[]
  let D = new Date().toLocaleDateString();
  for(key in req.query){
    _GET[key]=req.query[key]
  }
  for(key in req.body){
    _POST[key]=req.body[key]
  }/*
  if(_POST["Menus"]){
    _POST["Menus"]= JSON.parse(_POST["Menus"])
    for(key in db.Menus){
      if(key.Date == _POST["Menus"].Date);
    }
  }*/
  res.render('index', { 
    Title: 'Recettes à gogo',
    Menus: db.Menus,
    Recettes: _.sortBy(db.Recettes, 'Nom'),
    Today: D,
    ParamsGet: _GET
  });
});

module.exports = router;