functions = {
  NewMenu: function(params, db) {
    let MyMenu;
    MyMenu.Date=new Date(params['MenuDate']).valueOf;
    for (let i = 0; i < params.MenuMatin.split(';').length; i++) {
      
      if(!db.Recettes.some(row => row.Nom==params.MenuMatin.split(';')[i])) return [false, params.MenuMatin.split(';')[i]+" ne fait pas partie des recettes connues"];

    }
    MyMenu.Matin=params.MenuMatin.split(';');
    for (let i = 0; i < params.MenuMidi.split(';').length; i++) {
      
      if(!db.Recettes.some(row => row.Nom==params.MenuMidi.split(';')[i])) return [false, params.MenuMidi.split(';')[i]+" ne fait pas partie des recettes connues"];

    }
    MyMenu.Midi=params.MenuMidi.split(';');
    for (let i = 0; i < params.MenuSoir.split(';').length; i++) {
      
      if(!db.Recettes.some(row => row.Nom==params.MenuSoir.split(';')[i])) return [false, params.MenuSoir.split(';')[i]+" ne fait pas partie des recettes connues"];

    }
    MyMenu.Soir=params.MenuSoir.split(';');
    fs.writeFile('bdd.json', JSON.stringify(db, null, 2), dummy)
  },
  NewRecette: function(params, db, file) {
    let MyRecette;
    if(params[N_Name].length<2){

      if(db.Recettes.some(row => row.includes(params[N_Name]))) MyRecette.Nom=params[N_Name];
      else [false, "Le nom des recette doit avoir au moins 2 caractères"];

    } else {

    return [false, "Ce nom de recette est déja utilisé"];

    }

    if(file.RecettesImage) {

      fileName=params[N_Name].trim()+fileRecettesImage.name.split('.').pop();
      file.RecettesImage.mv(__dirname + '/public/images/' + fileName , function(err) {

        if(err){

        console.log(err);

        } else {

          MyRecette.Image=file.RecettesImage.name
          console.log("uploaded");

        }

      });

    }

    N_Ingredients=params["Ingredient"].split(';');
    for (let i = 0; i < N_Ingredients.length; i++) {

      N_Ingredients[i].split(',');
      if(N_Ingredients[i][0].isNaN) return 'quantité invalide';
      if(!db.Ingredients.some(row => row.includes(N_Ingredients[i][1]))) return [false, "unknown ingredients"];
    
    }

    MyRecette.Ingredients=[];
    for (let i = 0; i < N_Ingredients.length; i++) {

      db.Ingredients.forEach(key => { if(key.includes(N_Ingredients[i][1])) MyRecette.Ingredients.push(N_Ingredients[i][0], key[0],key[1]); });
      
    }
    
    MyRecette.Ingredients=N_Ingredients;
    MyRecette.Preparation=N_Preparation;
    db.Recettes.push(MyRecette);
    fs.writeFile('bdd.json', JSON.stringify(db, null, 2), dummy)
    return [true, "recette ajouté"];
  }
}
functions