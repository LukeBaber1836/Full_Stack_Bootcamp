
// Waits until jQyery document is linked for js to use
// Not neccessary if everything is at bottom of doc with
// jQuery link above js link
$(document).ready(function(){
    $("h1").css("color", "blue");
})

// .hasClass checks to see if a class is applied to certain element

$("body").keypress(function(event){
    $("h1").text(event.key);
})

// $("button").click(function(){
//     $("h1").slideToggle()
// })

$("button").click(function(){
    $("h1").slideUp().slideDown().animate({opacity: 0.5});
})

// $("button").click(function(){
//     $("h1").animate({opacity: 0.5});
// })

