import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "authentication",
  password: "123456",
  port: 5432,
});
db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// #--------- Database Functions ---------#
async function register(email, password){
  try{
    await db.query(
      `INSERT INTO users (email, password)
      VALUES('${email}', '${password}')`
    );
    return true;
  }
  catch(err){
    console.log(`Registration failed: ${err}`);
    return false;
  }
};

async function login(email, inputPassword){

  const result = await db.query(
    `SELECT *
     FROM users
     WHERE email='${email}';`
  );
  
  try{
    const validPassword = result.rows[0].password;

    if (inputPassword === validPassword){
      return true;
    } else {
      return false;
    }
  }
  catch (err){
    console.log(`Email not registered: ${err}`)
    return false;
  }
};


// #--------- Express Routing ---------#
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", (req, res) => {
  res.render("secrets.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  // Add email and password to database
  if (await register(email, password)){
    res.redirect('/');
  } else {
    console.log("Registration failed!");
    res.redirect('/register');
  }
});

app.post("/login", async (req, res) => {
  let password = req.body.password;
  let email = req.body.username;

  // Add email and password to database
  if (await login(email, password)){
    res.redirect('/secrets');
  } else {
    console.log("Login error: Invalid credentials");
    res.redirect('/login');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
