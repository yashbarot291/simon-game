var pattern=[];
var uspattern=[];
var col=["red", "blue", "green", "yellow"];
var level=0;
var ind;
$(document).keydown(function(){
  nextSequence();
});
function newGame(){
  level=0;
  pattern=[];
}
function nextSequence(){
  uspattern=[];
  level++;
  $("h1").text("Level "+level);
  var x= Math.floor(Math.random()*4);
  var ranCol=col[x];
  pattern.push(ranCol);
  playSound(ranCol);
  $("#"+ranCol).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  ind=0;
}
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(curr){
  $("#"+curr).addClass("pressed");
  setTimeout(function(){
        $("#"+curr).removeClass("pressed");
   },100);
}
$(".btn").click(function(){
  ui=$(this).attr("id");
  uspattern.push(ui);
  playSound(ui);
  animatePress(ui);
  checkAnswer();
  ind++;
});
function checkAnswer(){
  var f=1;
  if(uspattern[ind]!=pattern[ind])
    f=0;
  if(f==0)
  {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
          $("body").removeClass("game-over");
     },200);
     $("h1").text("Game Over, Press Any Key to Restart");
     newGame();
  }
  if(f && ind==level-1)
  {
    setTimeout(function(){
          nextSequence();
     },1000);
  }
}
