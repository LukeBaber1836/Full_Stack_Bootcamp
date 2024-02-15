const fs = require("fs");

function writeToFile(){
    fs.writeFile("message2.txt", "Hello from Node.js my dudes!", (err)=>{
        if (err) throw err;
        console.log("The file saved successfully!");
    });
}

fs.readFile("./message.txt", "utf-8", (err, data)=>{
    if (err) throw err;
    console.log(data);
});