//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

import React from "react";
import ReactDOM from "react-dom";


/// ---- Javascript ----
function greeting(){
    const time = new Date().getHours();
    let greeting = "";

    if (time <= 12 && time > 0){
        greeting = "Good Morning!"
        return greeting;
    }
    if (time > 12 && time < 18) {
        greeting = "Good Afternoon!"
        return greeting;
    }
    else {
        greeting = "Good Evening!"
        return greeting;
    }
}

function dynamicStyle(){
    const time = new Date().getHours();
    var customStyling = {};

    if (time <= 12 && time > 0){
        customStyling = {
            color: "red",
            fontSize: "20px",
            border: "2px solid red"
        };
        return customStyling;
    }
    if (time > 12 && time < 18) {
        customStyling = {
            color: "green",
            fontSize: "20px",
            border: "2px solid green"
        };
        return customStyling;
    }
    else {
        customStyling = {
            color: "blue",
            fontSize: "20px",
            border: "2px solid blue"
        };
        return customStyling;
    }
}

ReactDOM.render(
    <h1 style={dynamicStyle()}>
        h1 {greeting()}
    </h1>, 
    document.getElementById("root")
);