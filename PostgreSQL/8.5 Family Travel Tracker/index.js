import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

// let users = [
//   { id: 1, name: "Angela", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];

async function users(){
  const result = await db.query(
    `SELECT * FROM users`
  );
  return result.rows;
};

async function checkVisisted(){
  var countriesArray = [];
  const result = await db.query(
    `SELECT *
    FROM visited_countries
    JOIN users
    ON users.id = user_id;` 
  );

  for (let index = 0; index < result.rows.length; index++) {
    if (result.rows[index].id == currentUserId) {
      countriesArray.push(result.rows[index].country_code)
    }
  }
  return countriesArray;
};

async function getUsers(){
  var usersArray = [];
  const result = await db.query(
    `SELECT * 
    FROM users
    WHERE id=${currentUserId}` 
  );
  const userInfo = result.rows[0];
  return userInfo;
};


app.get("/", async (req, res) => {
  let currentUser = await getUsers();
  let countriesList = await checkVisisted();
  
  res.render('index.ejs',{
    countries: countriesList,
    total: countriesList.length,
    users: await users(),
    color: currentUser.color
  });
});


app.post("/add", async (req, res) => {
  let currentUser = await getUsers();
  let countriesList = await checkVisisted();

  try {
    const result = await db.query(
      `SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%${req.body.country.toLowerCase()}%'`
    );
    var countryCode = result.rows[0].country_code;
    
    // Add new country to database
    try {
      if(countriesList.includes(countryCode)) {throw err;}  // Check for duplicates

      const response = await db.query(
        `INSERT INTO visited_countries (id, country_code, user_id) VALUES (default, '${countryCode}', '${currentUserId}')`
      );
      res.redirect('/');
    } catch(err) {
      console.log(`Country already selected: ${err}`);
      res.render('index.ejs', {
        countries: countriesList,
        total: countriesList.length,
        error: 'Country already selected, please try again',
        users: await users(),
        color: "teal"
      });
    }
  
  } catch(err) {
    console.log(`Does not exist: ${err}`);
    res.render('index.ejs', {
      countries: countriesList,
      total: countriesList.length,
      error: 'Country does not exist, please try again',
      users: await users(),
      color: "teal"
    });
  }
});

app.post("/user", async (req, res) => {
  if (req.body.add === 'new'){
    res.render('new.ejs');
  } else  {
    currentUserId = req.body.user;
    res.redirect('/');
  }
  
});

app.post("/new", async (req, res) => {
  // Add new user
  const result = await db.query(
    `INSERT INTO users (name, color)
    VALUES('${req.body.name}','${req.body.color}')
    RETURNING *`
  );
  currentUserId = result.rows[0].id;
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
