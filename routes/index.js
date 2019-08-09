const express = require('express');
const router = express.Router();
const fs = require('fs');
const _ = require('lodash')
const db = "JSON.parse(fs.readFileSync('bdd.json', 'utf-8'))";
let functions = "eval(fs.readFileSync('functions.js', 'utf-8'))"
const languages = [[""], ["fr/","fr-FR"], ['en/','en-US']]
for (let i = 0; i < languages.length; i++) {

  router.all('/'+languages[i][0], function(req, res, next) {
    
    if(languages[i][0]=="") res.redirect('/en/');
    else {

      let D = new Date().toDateString();
      D = new Date(D).valueOf();

      res.render('index', {

        Title: 'Recettes à gogo',
        lang: languages[i],
        Menus: eval(db).Menus,
        Recettes: _.sortBy(eval(db).Recettes, 'Nom'),
        Today: D,
        ParamsGet: req.query,
      
      });
    
    }
    //console.log('req.files', req.files, 'req.files', req.fields);
  });

  router.all('/'+languages[i][0]+'Search', function(req, res, next) {

    if(languages[i][0]=="") res.redirect('/en/Search');
    else {

      console.log('req.body',req.body);
      console.log('req.files', req.files);
      res.render('index', { 

        Title: 'Recettes à gogo',
        lang: languages[i],
        Menus: eval(db).Menus,
        Recettes: eval(db).Recettes,
        ParamsPost: req.body,
        search: true

      });

    }
    
  });

  if(languages[i][0]!=""){

    router.post('/'+languages[i][0]+'New', function(req, res, next) {

      let msg;

      if(req.body['NewFeature']=='Menus'){

        msg=eval(functions).NewMenu(req.body, eval(db));

      }

      else if(req.body['NewFeature']=='Recettes'){

        msg=eval(functions).NewRecette(req.body, eval(db), req.files);

      }
      else if(req.body['NewFeature']=='Ingredient'){

        msg=eval(functions).NewIngredient(req.body, eval(db));

      }
      if(msg[0]) 
      console.log('test', functions, msg);
      res.redirect('/'+languages[i][0]);

    });

  }
  
}

router.post('/test', function(req, res, next) {

  console.log(req.body)
  debugger;
  res.redirect('/');

});

function dummy() {
  //do nothing
}
module.exports = router;