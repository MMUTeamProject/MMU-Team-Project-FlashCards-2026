var breakTime = 5
var workTime = 5
var isBreak = false;
var paused = false;
var startDate = new Date();
var timerID = "timer"
var playPauseButtonID = "playPauseButton"
function tick(){
    if (paused) return
	var newDate = new Date();
    var seconds = ((isBreak ? breakTime : workTime) + (startDate.getTime() - newDate.getTime()) / 1000)
    document.getElementById(timerID).style.color = isBreak ? "red": "green";
    if (seconds <= 0){
        isBreak = !isBreak;
        startDate = new Date();
    }
    document.getElementById(timerID).innerText = Math.floor(seconds / 60) + ":" + (Math.floor(seconds % 60) <= 8 ? "0" : "") + Math.ceil(seconds % 60)
}
var pausedTime
function playPause(){
    var button = document.getElementById(playPauseButtonID)
    paused = !paused;
    if (paused){
        pausedTime = (new Date()).getTime()
        button.innerText = ">"
    }
    else{
        pausedTime -= (new Date()).getTime()
        console.log(pausedTime)
        startDate.setTime(startDate.getTime() - pausedTime)
        button.innerText = "||"
    }
}

setInterval(tick, 10);
