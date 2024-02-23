import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

<<<<<<< HEAD
app.get("/", (req, res) => {});

app.post("/submit", (req, res) => {});
=======
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  let lettersNum = req.body["fName"].length + req.body["lName"].length;
  console.log(lettersNum);
  res.render("index.ejs",{numberOfLetters: lettersNum});
});
>>>>>>> ec9a788b1c77e79a63e1756973f684d8105bac28

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
