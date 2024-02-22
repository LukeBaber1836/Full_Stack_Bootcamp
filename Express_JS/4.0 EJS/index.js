import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const today = new Date();
    let day = today.getDay();

    let type = "a weekday"
    let dayAdvice = "it's time to work hard";

    if(day < 6 && day > 0){
        //weekday
        type = "a weekday";
        dayAdvice = "it's time to work hard";
    }else{
        //weekend
        type = "a weekend";
        dayAdvice = "it's time to relax";
    }

    res.render("index.ejs", {
        dayType: type,
        advice: dayAdvice,
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});