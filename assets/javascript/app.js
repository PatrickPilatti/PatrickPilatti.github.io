//SETUP VARIABLES
//==================================
var topics = ['Black Bear','Grizzly Bear','Polar Bear'];

var authKey = "6eoLYRCXCyVIW45VGjPI4MaYIsVxa8jL";

//URL BASE
//==================================
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" 

// FUNCTIONS
// ================================

function renderButtons(){
	var topics = $(this).attr("button");
	
	var queryURL = "https://api.giphy.com/v1/gifs/search?q" + topics + "&api_key=6eoLYRCXCyVIW45VGjPI4MaYIsVxa8jL&q=&limit=10&offset=0&rating=PG&lang=en"; 
 

         $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	console.log(response);
        

    //    topics.forEach(function(topics) {
    //   var listItem = $('<li>').text(topics);
    //   $('ul').append(listItem);
    // });

	$('#buttons-view').empty(); {

	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("topics");
		a.attr("topic",topics[i]);
		a.text(topics[i]);
		$("#buttons-view").append(a)
		renderButtons();
		console.log(renderButtons);
	}};




	$('#addTopic').on("click",function(event) {
		

		var topics =$("#topic-input").val().trim();

		topics.push(topic);

		document.getElementById("topicButtons").innerHTML = topic[i];
		
	});
		function displayTopics() {

        var topics = $(this).attr("topic");
         
         }

      $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	event.preventDefault();
        var topicsDiv = $("<div class= 'topic'>");
        var rating =response.Rated;

        var pOne = $('<p>').text("Rating:" + rating);

        topicsDiv.append(pOne);

        var imgURL = response.url;

        var image = $("<img>").attr("src", imgURl);

        topicsDiv.append(image);
    })

   });

  



