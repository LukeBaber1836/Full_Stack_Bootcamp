import express from "express";
import axios from "axios";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(express.static("public"));
const port = 8080;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1";

// Fixes MIME error -> helps specify correct path
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));


// -------------------------- Express Routing --------------------------

app.get("/", (req, res) =>{
  res.render("index.ejs");
});

app.get("/drinks", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random.php");
    let drinkList = [];
    drinkList = getDrinkList(result.data.drinks, drinkList);

    console.log(drinkList);

    res.render("drinks.ejs", {recipe: drinkList});
  } catch (error) {
    console.log(error.message);
    res.render("drinks.ejs", { recipe: error.message});
  }
});

app.get("/search", (req, res) => {
  res.render("search.ejs");
});

app.post("/search", async (req, res) => {
  try {
    let drinkList = [];
    let idList = await getDrinksIDList(req.body["alchoholic"], req.body["alchoholType"], req.body["glass"], req.body["category"]);

    console.log("Loading...");
    let drinkListAPI = await getDrinkByIDlist(idList);
    drinkList = getDrinkList(drinkListAPI, drinkList);
    console.log("Complete!");
    console.log(drinkList);

    res.render("search.ejs", {recipe: drinkList});
  } catch (error) {
    console.log(error.message);
    res.render("search.ejs", { recipe: error.message});
  }
});

app.post("/drinks", async (req, res) => {
  const name = req.body['drinkName'];
  try {
    const result = await axios.get(API_URL + `/search.php?s=${name}`);
    let drinkList = [];
    drinkList = getDrinkList(result.data.drinks, drinkList);

    res.render("drinks.ejs", { recipe: drinkList});
  } catch (error) {
    console.log(error.message);
    res.render("drinks.ejs");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// -------------------------- Backend Functions --------------------------

function getMeasurementsIngredients(ingredientList, measurementsList, drinkObject){
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

function getDrinkList(drinkListRaw, list){
  if (drinkListRaw) {
    for (let index = 0; index < drinkListRaw.length; index++) {
      list.push(getDrinkInfo(drinkListRaw, index));
    }
    return list;
  } else {
    return list = [];
  }
};

function getDrinkInfo(drinkListRaw, index){
  let drinkInfo = drinkListRaw[index];
  let ingredientList = [];
  let measurementsList = [];

  ingredientList, measurementsList = getMeasurementsIngredients(ingredientList, measurementsList, drinkInfo);

  let results = {
    drink: drinkInfo.strDrink,
    image: drinkInfo.strDrinkThumb,
    type: drinkInfo.strAlcoholic,
    category: drinkInfo.strCategory,
    glass: drinkInfo.strGlass,
    instructions: drinkInfo.strInstructions,
    ingredients: ingredientList,
    measurements: measurementsList
  }
  return results;
}

async function getDrinkByIDlist(idList){
  let apiResult = [];
  let drinksList = [];

  for (let index = 0; index < idList.length; index++) {
    try {
      apiResult = await axios.get(API_URL + `/lookup.php?i=${idList[index]}`);
      drinksList.push(apiResult.data.drinks[0])
    } catch (error) {
      console.log(error);
    }
  }
  return drinksList;
}

async function getDrinksIDList(alcoholic, ingredients, glass, category){
  let alcoholicIds, ingredientsIds, categoryIds, glassIds = [];
  let count = 0;

  // Get types from API
  if (alcoholic != "Any") {
    const resultAlcoholic = await axios.get(API_URL + `/filter.php?a=${alcoholic}`);
    alcoholicIds = getIds(resultAlcoholic);
    count++;
  }
  if (ingredients != "Any") {
    const resultIngredients = await axios.get(API_URL + `/filter.php?i=${ingredients}`);
    ingredientsIds = getIds(resultIngredients);
    count++;
  }
  if (glass != "Any") {
    const resultGlass = await axios.get(API_URL + `/filter.php?g=${glass}`);
    glassIds = getIds(resultGlass);
    count++;
  }
  if (category != "Any") {
    const resultCategory = await axios.get(API_URL + `/filter.php?c=${category}`);
    categoryIds = getIds(resultCategory);
    count++;
  }

  if ( count != 0) {
    // Get final list of IDs to generate drinks
    let drinkIdList = filterIds(alcoholicIds, ingredientsIds, categoryIds, glassIds, count);
    return drinkIdList;
  } else { 
    return [];
  }
}
  

function getIds(apiResponse) {
  let idList = [];
  if (apiResponse != 0) {
    for (let index = 0; index < apiResponse.data["drinks"].length; index++) {
      idList.push(apiResponse.data["drinks"][index]["idDrink"]);
    }
  }
  return idList;
}

// O(n^2) try to make more efficient
function filterIds(alcoholicIDs, ingredientsIDs, categoryIDs, glassIDs, inputNum){
  // Return only ids that are present in all categories
  let mergedList = alcoholicIDs.concat(alcoholicIDs, ingredientsIDs, categoryIDs, glassIDs);
  let flatList = mergedList;
  let filteredList = [];

  // If only one prefrence in input then the list will be destroyed
  if (inputNum > 1) {
    flatList = [...new Set(mergedList)];

    for (let index = 0; index < flatList.length; index++) {
      if (count(mergedList, flatList[index]) === inputNum) {
        filteredList.push(flatList[index]);
      }
    }
  } else { 
    filteredList = mergedList; 
  }
  return filteredList;
}

function count(array, id){
  let count = 0;
  array.forEach(element => {
    if (element === id) {
      count++;
    }
  });
  return count;
}