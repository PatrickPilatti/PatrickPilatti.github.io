var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var axios = require("axios");
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var path = require ('path');
var exphbs = require ('express-handlebars');
var logger = require("morgan");
var Note = require('./models/Note.js');
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var cheerio = require("cheerio");
// Require all models
var db = require("./models");
var PORT = 3000;
// Initialize Express
var app = express();
// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB (apparently unneeded in mongoose 5.0+)
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI, {
//   useMongoClient: true
// });
// Routes
app.use(require('./routes'));

app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  axios.get("https://www.ign.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    // Now, we grab every h2 within an article tag, and do the following:
    $("h3.item-title").each(function(i, element) {
      // Save an empty result object
      var result = [];
      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
      // Create a new Article using the `result` object built from scraping
      db.Headline.create(result)
        .then(function(dbHeadline) {
          // View the added result in the console
          console.log(dbHeadline);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          // return res.json(err);
        });
    });
    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
  });
});
// Route for getting all Articles from the db
app.get("/headlines", function(req, res) {
  // Grab every document in the Articles collection
  db.Headline.find({})
    .then(function(dbHeadline) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbHeadline);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      // res.json(err);
    });
});
// Route for grabbing a specific Article by id, populate it with it's note
app.get("/headlines/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Headline.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbHeadline) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbHeadline);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      // res.json(err);
    });
});
// Route for saving/updating an Article's associated Note
app.post("/headlines/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Headline.findOneAndUpdate({ _id: req.params.id },{$push: { note: dbNote._id }});
    })
    .then(function(dbHeadline) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbHeadline);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      // res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});