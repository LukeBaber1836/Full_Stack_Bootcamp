import React from "react";
import ReactDOM from "react-dom";

const customStyle = {
    color: "blue",
    fontSize: "20px",
    border: "2px solid black"
};

ReactDOM.render(
    <h1 style={customStyle}>Hello World!</h1>, 
    document.getElementById("root")
);


// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
