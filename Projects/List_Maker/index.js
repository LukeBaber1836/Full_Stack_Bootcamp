import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Note_App",
  password: "123456",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getList(){
  const result = await db.query(
    `SELECT * FROM note_items
    ORDER BY id ASC`
  );
  return result.rows;
};

async function addItem(text){
  try{
    await db.query(
      `INSERT INTO note_items (title)
      VALUES ('${text}');`
    );
  }
  catch(err){
    console.log(`Could not add item: ${err}`);
  }
};

async function editItem(id, text){
  try{
    await db.query(
      `UPDATE note_items
      SET title = '${text}'
      WHERE id = ${id};`
    );
  } 
  catch(err){
    console.log(`Could not edit item: ${err}`);
  }
};

async function deleteItem(id){
  try{
    await db.query(
      `DELETE FROM note_items
       WHERE id = ${id};`
    );
  } 
  catch(err){
    console.log(`Could not delete item: ${err}`);
  }
};

// ------# Express Routing #------

app.get("/", async (req, res) => {
  let result = await getList();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: result,
  });
});

// Add new item to database -> note_items
app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  await addItem(item);
  res.redirect("/");
});

// Edit list item
app.post("/edit", async (req, res) => {
  await editItem(req.body.updatedItemId, req.body.updatedItemTitle);
  res.redirect("/");
});

// Remove item from database (completed item)
app.post("/delete", async (req, res) => {
  await deleteItem(req.body.deleteItemId);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
