//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express, { response } from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true}));

const __dirname = dirname(fileURLToPath(import.meta.url));

function checkPassword(req, res, next){
    if(req.body["password"] == "ILoveProgramming"){
        // Go to secrets page
        userIsAuthorised = true;
        console.log("Access granted");
    }else{
        userIsAuthorised = false;
        console.log("Access denied");
    }
    next();
}
app.use(checkPassword);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) =>{
  if (userIsAuthorised){
    res.sendFile(__dirname + "/public/secret.html");
  }else{
    res.redirect("/");
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
