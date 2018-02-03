var inquirer = require('inquirer');

var showLtrs = require('./letter.js');

var letterCheck = require ('./word.js');

var gameDevs = require('./gamedevs.js')

var prompt = require('prompt');


console.log("Welcome to Hangman: Famous Video Game Developer Edition");
console.log("=========================");


prompt.start();

 var game = {
	devList: ['Hideo Kojima', 'Sid Meier', 'Markus Persson', 'Gabe Newell','John Romero','Satoru Iwata'],
	devsGuessed: 0,
	remainingGuesses: 10,
	selectedWord: null,

	gameStart: function(wrd) {
		this.guessReset();
		this.selectedWord = new Word(this.devList[Math.floor(Math.random()* this.devList.length)]);
		this.Word();
		this.userPrompt();
	},

	guessReset: function(){
		this.remainingGuesses = 10;
	},
	userPrompt: function(){
		var self = this;
		prompt.get(['letterGuess'], function(err, result){
			console.log("Your guess: " + result.letterGuess);
			var guessed = self.selectedWord.isLetterFound(result.letterGuess);

			if (guessed ==0) {
				console.log("Incorrect");
				self.remainingGuesses--;

			} else {
				console.log("Correct");
				if(self.selectedWord.wordFound()){
					console.log("Winner!");
					console.log("================");
					return;
				}

			}
			console.log("Guesses left: " + that.remainingGuesses);
			console.log("===================");
			if((self.remainingGuesses > 0) && (self.selectedWord.wordFound === false)){
				self.userPrompt();
			}
			else if(self.remainingGuesses ===0){
				console.log("Thats it! Thats the Dev!", self.selectedWord.words);
			} else {
				console.log(self.selectedWord.prototype.toString());
			}


			});
		}
	};


game.gameStart();
 

