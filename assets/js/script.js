
var initialsEl = document.getElementById("initials");
var timerEl = document.getElementById("time")
var button = document.getElementById("startButton")
var intro = document.getElementById("intro")
var title = document.getElementById("title")
var question = document.getElementById("question")
var choice1 = document.getElementById("choice1")
var choice2 = document.getElementById("choice2")
var choice3 = document.getElementById("choice3")
var choice4 = document.getElementById("choice4")
var questions = [
    { question: 'What is HTML?',
    choice1: 'JavaScript',
    choice2: 'Document Object Model',
    choice3: 'HyperText Markup Language',
    choice4: 'Cascading Style Sheets',
    answer: 'HyperText Markup Language'},

    { question: 'What is CSS?',
    choice1: 'JavaScript',
    choice2: 'Cascading Style Sheets',
    choice3: 'HyperText Markup Language',
    choice4: 'Document Object Model',
    answer: 'Cascading Style Sheets'},

    { question: 'What is DOM?',
    choice1: 'Document Object Model',
    choice2: 'Cascading Style Sheets',
    choice3: 'JavaScript',
    choice4: 'HyperText Markup Language',
    answer: 'Document Object Model'},
    
    { question: 'What is JS?',
    choice1: 'JavaScript',
    choice2: 'Cascading Style Sheets',
    choice3: 'HyperText Markup Language',
    choice4: 'Document Object Model',
    answer: 'JavaScript'} 
]

var choices = document.querySelectorAll(".choice")

choice1.style.display = "none"; 
choice2.style.display = "none";
choice3.style.display = "none";
choice4.style.display = "none";

var i = 0

var startTime = 75;

function myTimer() {
    var timeInterval = setInterval(() => {
        timerEl.textContent = "Time left: " + startTime;
        if (startTime <= 0) {
            timerEl.textContent = "FATALITY"
            timerEl.style.color = "red";
            clearInterval(timeInterval);
            endGame();
        }
        //Subtracts 1 from the start time
        startTime--;
    }, 1000);
}

function startGame() {
    myTimer(); //call timer
    button.style.display = "none";
    title.style.display = "none";
    intro.style.display = "none";
    choice1.style.display = "block"; 
    choice2.style.display = "block";
    choice3.style.display = "block";
    choice4.style.display = "block";
}

function setQuestion() {
    //use if statement so question only pops up if there are more questions
    if (i < questions.length) {
    //here we are removing the hidden class and setting the text for the question 
    question.textContent = questions[i].question
       //We want to loop through all the questions using questions.length
        for (x=0; x < questions.length; x++) {
            choices[x].classList.remove("hidden");
        }
        //Shows the text content of the current question.
        choice1.textContent = questions[i].choice1;
        choice2.textContent = questions[i].choice2;
        choice3.textContent = questions[i].choice3;
        choice4.textContent = questions[i].choice4;
    } else {
        for (x=0; x < questions.length; x++) {
            choices[x].classList.add("hidden");
        }
    endGame();
    }
}

button.onclick = startGame;

//function compareAnswer() fires any time you press any 4 answer. 
    //when click one it fires and compares text from button clicked to the answer (if statement).
function compareAnswer() { 
    var userValue = event.target.value; 
    //console.log(userValue);
    var userAnswer = questions[i] ["choice" + userValue];
    var quizAnswer = questions[i].answer;
    // console.log("userAnswer: " + userAnswer);
    // console.log("quizAnswer: " + quizAnswer);
    var correctAnswer = false;
    if(userAnswer == quizAnswer){
        correctAnswer = true;
    }
    if(correctAnswer){
        console.log("Correct ");
        i++;
        setQuestion();
    }
    else{
        //deduct 10seconds if wrong answer
        console.log("Incorrect -10s");
        startTime = startTime - 10;
    } 
}

function endGame() {
    question.textContent = "Finito";
    //hide buttons
    choice1.style.display = "none";
    choice2.style.display = "none";
    choice3.style.display = "none";
    choice4.style.display = "none";
    //when all questions are answered, user is prompted to enter their initials. 
    var initials = window.prompt("Enter your initials");
    console.log("Initials: " + initials);
    //stop timer when endGame() is called
    //send initials and 'time left' (aka score) to local storage
}

//eventlistener 'Start Quiz'
button.addEventListener("click", setQuestion)

//event listers for each choice button
choice1.addEventListener("click", compareAnswer)
    // choice1.onclick = function() {
    //     console.log("1st Choice clicked");
    // }
choice2.addEventListener("click", compareAnswer)
    // choice2.onclick = function() {
    //     console.log("2nd Choice clicked");
    // }
choice3.addEventListener("click", compareAnswer)
    // choice3.onclick = function() {
    //     console.log("3rd Choice clicked");
    // }
choice4.addEventListener("click", compareAnswer)
    // choice4.onclick = function() {
    //     console.log("4th Choice clicked");
    // }

//////////////////////////////////////////////////


function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
      quizEnd();
    }
}

  
function quizEnd() {
// stop timer
clearInterval(timerId);

// show end screen
var endScreenEl = document.getElementById("end-screen");
endScreenEl.removeAttribute("class");

// show final score
var finalScoreEl = document.getElementById("final-score");
finalScoreEl.textContent = time;

// hide questions section
questionsEl.setAttribute("class", "hide");
}

function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
  
    // make sure value wasn't empty
    if (initials !== "") {
      // get saved scores from localstorage, or if not any, set to empty array
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      // format new score object for current user
      var newScore = {
        score: time,
        initials: initials
      };
  
      // save to localstorage
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
      // To highscore page
      window.location.href = "./highscores.html";
    }
  }

  function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
      saveHighscore();
    }
  }

submitBtn.onclick = saveHighscore;

initialsEl.onkeyup = checkForEnter;