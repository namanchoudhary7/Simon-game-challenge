var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(document).keydown(function () {
    if (!started) {
        $('#level-title').text('Level ' + level)
        nextSequence();
        started = true;
    }

});
$('.btn').click(function () {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});
function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text('Level ' + level);
    var randomVar = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomVar];

    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);


}
function playSound(soundName) {
    var audio = new Audio('sounds/' + soundName + '.mp3');
    audio.play();
}
function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(() => {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }

    }
    else{
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}