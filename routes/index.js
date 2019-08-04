const express = require('express');
const router = express.Router();
const fs = require('fs');
const _ = require('lodash')
let db = JSON.parse(fs.readFileSync('bdd.json', 'utf-8'));

/* GET home page. */
  //JSON.stringify(db, null, 2)
  //fs.writeFile('../bdd.json', db, verify)
router.all('/', function(req, res, next) {
  let _GET=[]
  let D = new Date().toLocaleDateString();
  D = new Date(D).valueOf();
  for(key in req.query){
    _GET[key]=req.query[key]
  }
  for(key in req.body){
    _POST[key]=req.body[key]
  }
  res.render('index', { 
    Title: 'Recettes à gogo',
    Menus: db.Menus,
    Recettes: _.sortBy(db.Recettes, 'Nom'),
    Today: D,
    ParamsGet: _GET
  });
});
router.all('/Search', function(req, res, next) {
  let _GET=[], _POST=[];
  for(key in req.query){
    _GET[key]=req.query[key]
  }
  for(key in req.body){
    _POST[key]=req.body[key]
  }
  console.log(_POST)
  res.render('index', { 
    Title: 'Recettes à gogo',
    Menus: db.Menus,
    Recettes: db.Recettes,
    ParamsPost: _POST,
    search: true
  });
});/*
router.post('/New', function(req, res, next) {
  for(key in req.body){
    _POST[key]=req.body[key]
  }
  if(_POST['NewFeature']=='Menus'){

  }
  else if(_POST['NewFeature']=='Recettes'){
    let NewRecette;
    NewRecette.Nom=_POST[];
    NewRecette.Image="";
    NewRecette.Ingredients=[];
    NewRecette.Preparation;
    db.Recettes.push(NewRecette)
  }
   res.redirect('/');
});
*/

module.exports = router;