var letter = function(ltr) {
	this.character = ltr;
	this.appear = false;
	this.letterRender = function(){
		return !(this.appear) ? "_" : this.character;
		
	};

};
console.log("Letter Connected..");
 module.exports = letter;




