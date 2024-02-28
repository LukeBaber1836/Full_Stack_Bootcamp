import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "www.thecocktaildb.com/api/json/v1/1";

app.use(express.static("public"));

app.get("/", (req, res) =>{
  res.render("index.ejs");
});

app.get("/random", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "/random");
        res.render("index.ejs", { secret: result.data.secret, user: result.data.username });
    } catch (error) {
        res.render("index.ejs", { user: error.message});
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
