const express = require('express');
const router = express.Router();
const fs = require('fs');
const _ = require('lodash');
const db = "JSON.parse(fs.readFileSync('bdd.json', 'utf-8'))";
let functions = "eval(fs.readFileSync('functions.js', 'utf-8'))";
const languages = [[""], ["fr/","fr-FR"], ['en/','en-US']];
let newError = false;

for (let i = 0; i < languages.length; i++) {

  router.all('/'+languages[i][0], function(req, res, next) {

    let D = new Date().toDateString();
    D = new Date(D).valueOf();
    console.log(req.query, req.body)
    res.render('index', {
      // envoie des données au fichier pug
      Title: 'Recettes à gogo',
      lang: languages[i],
      //parametre stoquant les menus
      Menus: eval(db).Menus,
      //parametre stoquant les recettes
      Recettes: _.sortBy(eval(db).Recettes, 'Nom'),
      //parametre stoquant la date du jour
      Today: D,
      //parametre stoquant les requete get
      ParamsGet: req.query,
      //parametre stoquant les requete post
      ParamsPost: req.body,
      alertMsg: newError
    
    });
    
    newError = false;

    
    
  });
  
}

router.post('/New', function(req, res, next) {

  let msg;
  if(req.body.lang==""||!languages.some(row => row.includes(req.body.lang))) req.body.lang='en/';
  arr=["Menu", "Recette", "Ingredient"]
  console.log(req.body.NewFeature);
  if(arr.includes(req.body.NewFeature)) msg=eval('eval(functions).New'+req.body.NewFeature+'(req.body, eval(db), req.files)');
  else msg[false, "requete inconnu"];
  if(msg[0]) res.redirect(msg[1]);
  else newError=msg[1], res.redirect('back');

});

router.get('/*', function(req, res, next) {

  res.redirect('/en/');

  
});

function dummy() {
  //do nothing
}
module.exports = router;