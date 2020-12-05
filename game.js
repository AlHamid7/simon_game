
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;



// $(document).keypress(function(){
// if(!started){
//   nextSequence();
//   started = true;
//   $("#level-title").text("Level " + level);
// }
// });



// $(".btn").click(function(){
//   var userChosenColor = $(this).attr("id");
//   userClickedPattern.push(userChosenColor);

//   playsound(userChosenColor);
//   animatePress(userChosenColor);
//   checkAnswer(userClickedPattern.length-1);
// });



$(document).touchstart(function(){
if(!started){
  nextSequence();
  started = true;
  $("#level-title").text("Level " + level);
}
});

$(".btn").touchstart(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playsound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern = [];

  level++;
$("#level-title").text("Level" + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playsound(randomChosenColor);

}

function playsound(name){

  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);

    }
  } else{
    console.log("wrong");
    playsound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game_over. Press any key to start");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
