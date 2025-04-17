var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["green","red","blue","yellow"];
var level = 0;
var started = false;

$(document).keydown(function(event){
if (!started){
    $("h1").text("Level "+level);
    // console.log(event.key);
    nextSequence();
    started = true;
}
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");    
    console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswers(userClickedPattern.length-1);
});
// ---------------------------------------CORE-PART-----------------------------------//
function checkAnswers(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        // console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    } else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over,Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
};
// -----------------------------------------------------------------------------------//
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    function generateRandomNumber(){
        var randomNumber1= Math.floor((Math.random()) * 4);
        return randomNumber1;
    }
    if (buttonColors.length === 0) {
        console.error("Error: buttonColors array is empty.");
        return;
    }
    var chosenColor = buttonColors[generateRandomNumber()];
    gamePattern.push(chosenColor);
    // console.log(gamePattern);
    $("#" + chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);  
    playSound(chosenColor);
};
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");     
    },100);
};
function playSound(name){
    var audio1 = new Audio("./"+name+".mp3");
    audio1.play();
}
function startOver(){
    level = 0;
    gamePattern =[];
    started = false;
};
