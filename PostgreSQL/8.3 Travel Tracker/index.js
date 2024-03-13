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
  port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted(){
  const result = await db.query(
    "SELECT country_code FROM visited_countries "
  );
  
  var countriesArray = [];
  for (let index = 0; index < result.rows.length; index++) {
    countriesArray.push(result.rows[index].country_code)
  }
  
  return countriesArray;
};



app.get("/", async (req, res) => {
  let countriesList = await checkVisisted();
  
  res.render('index.ejs',{
    countries: countriesList,
    total: countriesList.length
  });
});

app.post("/add", async (req, res) => {
  let countriesList = await checkVisisted();

  try {
    const result = await db.query(
      `SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%${req.body.country.toLowerCase()}%'`
    );
    var countryCode = result.rows[0].country_code;
    
    // Add new country to database
    try {
      const response = await db.query(
        `INSERT INTO visited_countries (id, country_code) VALUES (default, '${countryCode}')`
      );
      res.redirect('/');
    } catch(err) {
      console.log(`Country already selected: ${err}`);
      res.render('index.ejs', {
        countries: countriesList,
        total: countriesList.length,
        error: 'Country already selected, please try again'
      });
    }

  } catch(err) { 
    console.log(`Does not exist: ${err}`);
    res.render('index.ejs', {
      countries: countriesList,
      total: countriesList.length,
      error: 'Country does not exist, please try again'
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
