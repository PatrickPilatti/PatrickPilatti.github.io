var mongoose = require("mongoose");

//Saving a reference to the Schema constructor.
var Schema = mongoose.Schema;

var NoteSchema = new Schema ({

    title: String,

    body: String
});
//Creates model from above schema, using mongoose's model method.
var Note =mongoose.model("Note", NoteSchema);

module.exports = Note;
