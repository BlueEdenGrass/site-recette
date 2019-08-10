functions = {
  NewMenu: function(params, db) {
    debugger
    let MyMenu;
    if(Object.prototype.toString.call(new Date) === "[object Date]") MyMenu.Date=new Date(params.MenuDate).valueOf;
    else return [false, "Invalid Date"];
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
    fs.writeFile('test.json', JSON.stringify(db, null, 2), dummy)
    return [true,"/"+params.lang+"?Menus="+MyMenu.Date]
  },
  NewRecette: function(params, db, file) {
    let MyRecette={Nom:"",Image:"",Ingredients:[],Preparation:""};
    if(params.RecettesName.length<2){

      if(db.Recettes.some(row => row.includes(params.RecettesNames))) MyRecette.Nom=params.RecettesName;
      else [false, "Ce nom de recette est déja utilisé"];

    } else {

      return [false, "Le nom des recette doit avoir au moins 2 caractères"];

    }

    let N_Ingredients=params.RecettesIngredient.split(';');
    for (let i = 0; i < N_Ingredients.length; i++) {

      N_Ingredients[i].split(',');
      if(N_Ingredients[i][0].isNaN) return 'quantité invalide';
      if(!db.Ingredients.some(row => row.includes(N_Ingredients[i][1]))) return [false, "unknown ingredients"];
    
    }

    for (let i = 0; i < N_Ingredients.length; i++) {

      db.Ingredients.forEach(key => { if(key.includes(N_Ingredients[i][1])) MyRecette.Ingredients.push(N_Ingredients[i][0], key[0],key[1]); });
      
    }
    
    MyRecette.Ingredients=N_Ingredients;
    MyRecette.Preparation=N_Preparation;

    if(file.RecettesImage) {

      fileName=params.RecettesName+'.'+file.RecettesImage.name.split('.').pop();
      file.RecettesImage.mv(__dirname + '/public/images/' + fileName , function(err) {

        if(err){

          console.log(err);
          return [false, "erreur lors du chargement de l'image"]

        } else {

          MyRecette.Image=fileName
          console.log("uploaded");
          db.Recettes.push(MyRecette);
          fs.writeFile('test.json', JSON.stringify(db, null, 2), dummy)
          return [true, "/"+params.lang+"?Recettes="+MyRecette.Nom];

        }

      });

    }

  }
}
functions