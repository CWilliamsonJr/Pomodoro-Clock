'use strict'

$(document).ready(function() {
  let SessionInitMintues; // holds starting session minutes
  let BreakInitMintues; // holds starting break minutes
  let sessionTime, sessionInterval; // holds the timer to be called later
  let breakTime, breakInterval;
  let stopTime = "00"; // used for comparsion for the seconds

  let pause = true;  // used to detect if the timer was paused
  let which ="session", started = true; // determins which to pause
  let sessionTag = "#session",
    breakTag = "#break" // used to determine which clock to chage
  
  $(".increase").addClass("btn-success");
  $(".decrease").addClass("btn-warning");

  $("button").click(function(event) {
    ChangeTime(event); // increase or decrease time
  });
  $("#start_btn").click(function() {

    if (started === true) { // used to stop the start button from reseting the inital time.
      SessionInitMintues = $("#session_minutes").text()
      BreakInitMintues = $("#break_minutes").text();
    } 
    
    
    breakTime = setInterval.bind(null, function() { // binds setInterval to be called as a function
      
      if (which !== "break") which = "break";
      
      PomodoroTimer(BreakInitMintues, breakTag);   // function used for the timer.
      
      if (($("#break_seconds").text()) == stopTime && $("#break_minutes").text() === "00") {
        
        let playAlarm = setInterval(function(){ // plays alarm sounds when timer ends
           $("#alarm")[0].play(); 
            let stopAlarm = setTimeout(function(){              
              clearInterval(playAlarm);
            },4000)
        },1000)
         let startTime = setTimeout(function(){
          sessionInterval = sessionTime();
        },5000)
        clearInterval(breakInterval);
        
      }
    }, 1000);

    sessionTime = setInterval.bind(null, function() {
      if (which !== "session") which = "session";
      PomodoroTimer(SessionInitMintues, sessionTag);
      if (($("#session_seconds").text()) == stopTime && $("#session_minutes").text() === "00") {
        
        let playAlarm = setInterval(function(){
           $("#alarm")[0].play(); 
            let stopAlarm = setTimeout(function(){             
              clearInterval(playAlarm);
            },4000)
        },1000)
         let startTime = setTimeout(function(){
          breakInterval = breakTime();
        },5000)
        clearInterval(sessionInterval);        
      }
    }, 1000);
  
    if (which === "session") {
        sessionInterval = sessionTime();
        pause = true;
      } else {
        breakInterval = breakTime();
        pause = true;
      }
      
  })
  $("#pause_btn").click(function() {
    started = false;
    if (pause === true) {  // pauses the timer
      clearInterval(sessionInterval);
      clearInterval(breakInterval);
      pause = false;
    } 
  });
  $("#reset_btn").click(function() { // resets the timer
    $("#session_minutes").text(SessionInitMintues)
    $("#break_minutes").text(BreakInitMintues);
  })

  $("#session_minutes").text("25");
  $("#session_seconds").text("00");
  $("#break_minutes").text("5");
  $("#break_seconds").text("00");

});

function PomodoroTimer(timerInitMinutes, timerTag) {

  const stopTime = "00";
  if (($(timerTag + "_seconds").text()) == stopTime && $(timerTag + "_minutes").text() === "00") {
    $(timerTag + "_minutes").text(timerInitMinutes); // adds the original time back to the timer
  }
  
  let minutes;
  let seconds;

  minutes = Number($(timerTag + "_minutes").text());
  seconds = Number($(timerTag + "_seconds").text());
/* 
 used to make the timer go from 00 to 59.
 otherwise just continue to count down.
   */
  if (seconds == 0) {
    --minutes;
    $(timerTag + "_minutes").text(minutes);
    $(timerTag + "_seconds").text("59");

    seconds = 59;
    $(timerTag + "_seconds").text(seconds);
    if (minutes <= 0) {
      $(timerTag + "_minutes").text("00")
      if (minutes < 0) {
        seconds = "00";
        $(timerTag + "_seconds").text("00");
      }
    };

  } else {
    --seconds;
  }
//****************
  if (seconds < 10) { // adds 0 to the seconds less than 10
    $(timerTag + "_seconds").text("0" + seconds);
  } else {
    $(timerTag + "_seconds").text(seconds);
  }
}

function ChangeTime(event) {
  let minutes;
  switch (event.target.id) { // detects what was clicked.
    case "session_decrease":
      minutes = Number($("#session_minutes").text());

      if (minutes <= 1) { // stops the mintues from being less than one.
        if($("#session_minutes").text() == "00"){
          minutes = "00";
        }else{
          $("#session_minutes").text("1");
        }
        
      } else {
        --minutes;
        $("#session_minutes").text(minutes);
      }
      
      break;
    case "session_increase":
      minutes = Number($("#session_minutes").text());
      ++minutes;
      $("#session_minutes").text(minutes);

      break;
    case "break_increase":
      minutes = Number($("#break_minutes").text());
      ++minutes;
      $("#break_minutes").text(minutes);
      break;
    case "break_decrease":
      minutes = Number($("#break_minutes").text());
      
      if (minutes <= 1) {
        if($("#break_minutes").text() == "00"){
          minutes = "00";
        }else{
          $("#break_minutes").text("1");
        }
        
      } else {
        --minutes;
        $("#break_minutes").text(minutes);
      }
      break;
  }
  
}