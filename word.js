var require = require("./letter.js");

	function Word(target){
		this.target = target;
		this.word = wrd;
		this.letters = [];
		this.wordFound = false;


		this.letGet = function() {
			for(var i=0; i < this.target.length; i++){
				var newLetter = new Letter(this.word[i]);
				this.letters.push(new Letter(this.target[i]));
			}
		};
	

this.wasWordFound = function() {
	if(this.letters.every(function(ltr){
		return ltr.appear === true;
	})){
		this.wordFound = true;
		return true;
	}

};

this.isLetterFound = function(ltrGuess) {
	var returnWhat =0;
	this.letters.forEach(function(ltr){
		if(ltr.letter === guessedLetter){
			ltr.appear = true;
			returnWhat++;
		}
	})
	return returnWhat;
};

this.prototype.toString = function() {
	var showLrt = '';

	list.letters.forEach(function(ltr){
		var selectedLetter = ltr.letterRender();
		showLrt+=selectedLetter;

	});

	return showLrt;
};
}
console.log(" Word Connected...");
module.exports=Word;

