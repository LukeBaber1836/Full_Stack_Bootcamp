import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
<<<<<<< HEAD
  res.render("index.ejs");
=======
  res.render("solution.ejs");
>>>>>>> ec9a788b1c77e79a63e1756973f684d8105bac28
});

app.post("/submit", (req, res) => {
  const numLetters = req.body["fName"].length + req.body["lName"].length;
<<<<<<< HEAD
  res.render("index.ejs", { numberOfLetters: numLetters });
=======
  res.render("solution.ejs", { numberOfLetters: numLetters });
>>>>>>> ec9a788b1c77e79a63e1756973f684d8105bac28
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
