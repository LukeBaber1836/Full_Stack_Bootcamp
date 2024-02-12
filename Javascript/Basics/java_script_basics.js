//Assign variables
var x = 9;
var y = "Hello";
var z = true;

// Math
var total = x + 6; // >> 15
var total2 = (x - 3)/3; // >> 2
var total3 = Math.pow(x, 2); // 9^2 = 81

// Print
console.log("Hello World");

// Control flow
function bmiCalculator(weight, height) {
    var bmi = (weight)/(Math.pow(height, 2));
    var interpretation ="";
    
    // Check bmi low to high
    if (bmi < 18.5) {
        interpretation = "Your BMI is " + bmi + ", so you are underweight.";
    }
    else if (bmi >= 18.5 && bmi < 24.9) {
        interpretation  = "Your BMI is " + bmi + ", so you have a normal weight.";
    }else{
        interpretation = "Your BMI is " + bmi + ", so you are overweight.";
    }
    
    return interpretation;
}
 
function isLeap(year) {
    var results = "";
    //Write your code here.    
    if (year % 4 === 0){
        if (year % 100 != 0){
            results = "Leap year.";
        }
        else if (year % 400 === 0){
            results = "Leap year.";
        }else{
            results = "Not leap year.";
        }
    }else{
        results = "Not leap year.";
    }
    
    return results;
}
console.log(isLeap(2024))

// Arrays
var guestList = ["Bill", "Bob", "Jack", "Jill"];
var guestName = "Billy";

if (guestList.includes(guestName)){
    console.log("Welcome!")
}else{
    console.log("Go away!")
}

// Fizz buzz example
var output = [];
var count = 1;

function fizzBuzz(){
    var result = "";
    if (count % 3 === 0 && count % 5 === 0){
        console.log("FizzBuzz");
    }
    else if (count % 3 === 0){
        console.log("Fizz");
    }
    else if (count % 5 === 0){
        console.log("Buzz");
    }else{
        console.log(count);
    }
    output.push(count++);
}

for (let index = 0; index < 15; index++) {
    fizzBuzz()
}

// Randome Guest selector
var guestList = ["Bill", "Bob", "Jack", "Jill"];
var number = Math.floor(Math.random() * guestList.length)
console.log(guestList[0])

function fibonacciGenerator (n) {
    var result = [];
    if (n === 1){
        result = [0];
    }
    else if (n === 2){
        result = [0,1];
    }
    else {
        result = [0,1]
        for (let i = 2; i < n; i++) {
            // Sum last two values
            result.push(result[result.length - 2] + result[result.length - 1]);
        }
    }
    return result;
}

console.log(fibonacciGenerator(10));

