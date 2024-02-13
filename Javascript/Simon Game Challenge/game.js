var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(".btn").click(function() { 
    var userClickedColor = $(this).attr("id");
    userClickedPattern.push(userClickedColor);

    playSound(userClickedColor);
    animatePress(userClickedColor);

    checkAnswer(userClickedPattern.length-1)
});

$(document).keypress(function(){ 
    // Start game
    if (!started){ 
        setTimeout(function(){ nextSequence(), 500 })
        started = true;}
});

function nextSequence() {
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level)
    var randomColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor)
    flashButton(randomColor);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // Success
        if (gamePattern.length === userClickedPattern.length){
            console.log("success");
            setTimeout(function() {nextSequence()}, 1000);
        }
    } else {
        // Wrong
        console.log("wrong");
        $("#level-title").text("Game over! Press any key to restart");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },500);

        restartGame(); 
    }
}

function animatePress(color){
    $("#" + color).addClass("pressed");
    setTimeout(function(){
        $("." + color).removeClass("pressed");
    },100);
}

function flashButton(color){
    $("." + color).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);
}

function playSound(color){
    var colorSound = new Audio("./sounds/" + color + ".mp3");
    colorSound.play();
}

function restartGame(){
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;
}
