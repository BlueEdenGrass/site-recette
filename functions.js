functions = {
  NewMenu: function(params, db) {
    let MyMenu={Date:0, Matin:[], Midi:[], Soir:[]};
    let a=new Date(params.MenuDate);
    if(a!="Invalid Date") MyMenu.Date = a.valueOf();
    else return [false, "Invalid Date"];
    if(params.MenuMatin==""&&params.MenuMidi==""&&params.MenuSoir=="") return [false, "Un menu doit avoir au moins une recette"];
    if(params.MenuMatin!=""){
      for (let i = 0; i < params.MenuMatin.split(';').length; i++) {
        
        if(!db.Recettes.some(row => row.Nom==params.MenuMatin.split(';')[i])) return [false, params.MenuMatin.split(';')[i]+" ne fait pas partie des recettes connues"];

      }
    }
    MyMenu.Matin=params.MenuMatin.split(';');
    if(params.MenuMidi!=""){
      for (let i = 0; i < params.MenuMidi.split(';').length; i++) {
        
        if(!db.Recettes.some(row => row.Nom==params.MenuMidi.split(';')[i])) return [false, params.MenuMidi.split(';')[i]+" ne fait pas partie des recettes connues"];

      }
    }
    MyMenu.Midi=params.MenuMidi.split(';');
    if(params.MenuSoir!=""){
      for (let i = 0; i < params.MenuSoir.split(';').length; i++) {
        
        if(!db.Recettes.some(row => row.Nom==params.MenuSoir.split(';')[i])) return [false, params.MenuSoir.split(';')[i]+" ne fait pas partie des recettes connues"];

      }
    }
    MyMenu.Soir=params.MenuSoir.split(';');
    db.Menus.push(MyMenu);
    fs.writeFile('bdd.json', JSON.stringify(db, null, 2), dummy);
    return [true, "/"+params.lang+"?Menus="+new Date(MyMenu.Date).tolocaleDateString()]
  },
  NewRecette: function(params, db, file) {
    let MyRecette={Nom:"",Image:"",Ingredients:[],Preparation:""};
    if(params.RecetteNom.length<2){

      return [false, "Le nom des recette doit avoir au moins 2 caractères"];

    } else {

      if(db.Recettes.some(row => row.Nom==params.RecetteNom)) return [false, "Ce nom de recette est déja utilisé"];
      else MyRecette.Nom=params.RecetteNom;

    }
    if(params.RecetteIngredients.substr(-1)==","||params.RecetteIngredients.substr(-1)==";") [false, "la liste des ingredients ne doit pas finir par ',' ou par ';'."];
    let N_Ingredients=params.RecetteIngredients.split(';');
    for (let i = 0; i < N_Ingredients.length; i++) {

      N_Ingredients[i]=N_Ingredients[i].split(',');
      if(N_Ingredients[i][0].isNaN) return 'quantité invalide';
      if(!db.Ingredients.some(row => row.includes(N_Ingredients[i][1]))) return [false, "unknown ingredients"];
    
    }

    for (let i = 0; i < N_Ingredients.length; i++) {

      db.Ingredients.forEach(key => { if(key.includes(N_Ingredients[i][1])) MyRecette.Ingredients.push([N_Ingredients[i][0], key[0],key[1]]); });
      
    }
    
    MyRecette.Preparation=params.Preparation;

    if(file.RecetteImage) {

      fileName=params.RecetteNom+'.'+file.RecetteImage.name.split('.').pop();
      debugger;
      file.RecetteImage.mv(__dirname + '/../public/images/' + fileName , function(err) {

        if(err){

          console.log(err);
          return [false, "erreur lors du chargement de l'image"]

        } else {

          console.log("uploaded");

        }

      });
      MyRecette.Image=fileName
      db.Recettes.push(MyRecette);
      fs.writeFile('bdd.json', JSON.stringify(db, null, 2), dummy)
      return [true, "/"+params.lang+"?Recettes="+MyRecette.Nom];
    }

  },
  NewIngredient: function(params, db){

    let Mesure = ["Gramme", "Litre", "Sachet", "Unité", "+"], MyIngredient=[];
    if(!Mesure.includes(params.IngredientMesure)) return [false, "Unité de mesure inconnue"];
    params.IngredientNom= params.IngredientNom.charAt(0).toUpperCase() + params.IngredientNom.slice(1).toLowerCase();
    console.log(params.IngredientNom);
    if(db.Ingredients.some(row => row[1]==params.IngredientNom)) return [false, paramsIngredientNom+" est déja dans la base de donnée"];
    MyIngredient=[params.IngredientMesure, params.IngredientNom];
    db.Ingredients.push(MyIngredient);
    fs.writeFile('bdd.json', JSON.stringify(db, null, 2), dummy)
    return [false, "L'ingredient "+MyIngredient[1]+" à été ajouté"];
  
  }
}
functions