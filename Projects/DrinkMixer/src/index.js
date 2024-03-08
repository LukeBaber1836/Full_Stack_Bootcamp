import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1";

// Fixes MIME error -> helps specify correct path
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) =>{
  res.render("index.ejs");
});

app.get("/random", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "/random.php");
        let drinkInfo = result.data.drinks[0];
        let ingredientList = [];
        let measurementsList = [];
        
        ingredientList, measurementsList = getMesurementsIngredients(ingredientList, measurementsList, drinkInfo);

        res.render("random.ejs", {
          drink: drinkInfo.strDrink,
          image: drinkInfo.strDrinkThumb,
          type: drinkInfo.strAlcoholic,
          category: drinkInfo.strCategory,
          glass: drinkInfo.strGlass,
          instructions: drinkInfo.strInstructions,
          ingredients: ingredientList,
          measurements: measurementsList
        });
    } catch (error) {
        console.log(error.message);
        res.render("random.ejs", { drink: error.message});
    }
});

app.get("/features", (req, res) =>{
  res.render("features.ejs");
});

app.get("/about", (req, res) =>{
  res.render("about.ejs");
});

app.get("/login", (req, res) =>{
  res.render("login.ejs");
});

app.get("/signup", (req, res) =>{
  res.render("signup.ejs");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


function getMesurementsIngredients(ingredientList, measurementsList, drinkObject){
  // Get ingredients
  for (let index = 17; index < 32; index++) {
    if (Object.entries(drinkObject)[index][1] === null) {break;} else {
      ingredientList.push(Object.entries(drinkObject)[index][1]);
    }
  }

  // Get measurements
  for (let index = 32; index < 46; index++) {
    if (Object.entries(drinkObject)[index][1] === null) {break;} else {
      measurementsList.push(Object.entries(drinkObject)[index][1]);
    }
  }

  return ingredientList, measurementsList;
}


