const express = require('express');
const router = express.Router();
const fs = require('fs');
const _ = require('lodash')
let db = "JSON.parse(fs.readFileSync('bdd.json', 'utf-8'))";

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
    Menus: eval(db).Menus,
    Recettes: _.sortBy(eval(db).Recettes, 'Nom'),
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
    Menus: eval(db).Menus,
    Recettes: eval(db).Recettes,
    ParamsPost: _POST,
    search: true
  });
});
router.post('/New', function(req, res, next) {
  let _POST=[];
  for(key in req.body){
    _POST[key]=req.body[key]
  }
  if(_POST['NewFeature']=='Menus'){
    NewMenu(_POST);
  }
  else if(_POST['NewFeature']=='Recettes'){
    debugger;
    NewRecette(_POST);
  }

  res.redirect('/');
});
router.post('/test', function(req, res, next) {
  let _POST=[];
  for(key in req.body){
    _POST[key]=req.body[key]
  }
  console.log(_POST)
  debugger;
  res.redirect('/');
});
function NewMenu(params) {
  
}
function NewRecette(params) {
  let MyRecette;
    MyRecette.Nom=params[N_Name];
    MyRecette.Image=params[N_Image];
    N_Ingredient=params["Ingredient"].split(';');
    N_Ingredient.forEach(element => {
      element.split(',');
    });
    if(db.Ingredient.includes(N_Ingredient)) MyRecette.Ingredients=N_Ingredient;
    else return "unknown ingredient"
    MyRecette.Preparation;
    db.Recettes.push(MyRecette);
    return "recette ajouté"
}
module.exports = router;