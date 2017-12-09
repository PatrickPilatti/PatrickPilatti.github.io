
function verify(){

	var question1 = document.quiz.question1.value;
	var question2 = document.quiz.question2.value;
	var question3 = document.quiz.question3.value;
	var correct = 0;


	if (question1 == "October, 2000") {

		correct++;
}
	if (question2 == "2004") {
		
		correct++;
}
	if (question3 == "2005") {

		correct++;
}

var messages = ["A winrar is u!", "Meh", "Very dishonuraburr!"];

var images = ["assets/images/win.gif", "assets/images/meh.gif", "assets/images/lose.gif"];


var score;

	if (correct < 1) {
		score = 2;
	}

	if (correct > 0 && correct < 3) {
		score = 1;
	}

	if (correct > 2) {
		score = 0;
	}

document.getElementById("after_submit").style.visibility = "visible";

document.getElementById("messages").innerHTML = messages[score];

document.getElementById("number_correct").innerHTML = "you got" + correct + "correct.";
document.getElementById("images").src =images[score];
};

var total_seconds =60*1;

var c_minutes = parseInt(total_seconds/60);

var c_seconds = parseInt(total_seconds%60);
function CheckTime(){

	document.getElementById("quiz-time-left").innerHTML ='Time Left: '+ c_minutes + ' minutes ' + c_seconds + ' seconds' ;

	if(total_seconds <=0){
		setTimeout('document.quiz.submit()',1);
	} else{
		total_seconds = total_seconds -1;
		c_minutes = parseInt(total_seconds/60);
		c_seconds = parseInt(total_seconds%60);
		setTimeout("CheckTime()",1000);
	}}
	setTimeout("CheckTime()", 1000);

	
