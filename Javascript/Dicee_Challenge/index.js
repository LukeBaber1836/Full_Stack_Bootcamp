function rollDice() {
    var randomNumber1 = Math.floor(Math.random() * 6) + 1; // Rand num from 1 to 6
    var randomNumber2 = Math.floor(Math.random() * 6) + 1; // Rand num from 1 to 6
    
    // Change title based off of who won
    changeTitle(randomNumber1, randomNumber2)

    document.querySelector(".img1").setAttribute("src", "./images/dice" + randomNumber1 + ".png")
    document.querySelector(".img2").setAttribute("src", "./images/dice" + randomNumber2 + ".png")
}

function changeTitle(number1, number2) {
    if (number1 === number2){
        // Tie
        document.querySelector("h1").textContent = "Draw!";
    }
    else if (number1 > number2){
        // Player 1 wins
        document.querySelector("h1").textContent = "Player 1 Wins!";
    }else{
        // Player 2 wins
        document.querySelector("h1").textContent = "Player 2 Wins!";
    }
}

rollDice();