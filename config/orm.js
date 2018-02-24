// *********************************************************************************
// orm.js - This file offers a set of easier-to-use methods for interacting with the MySQL db.
// *********************************************************************************

// Dependencies
// =============================================================


const connection = require('./connection.js');

// orm the abstract way of communicating with the database
// makes the actual SQL queries
const orm = {
  selectAll: function(table, onResult) {
    const query = 'SELECT * FROM ??';
    connection.query(query, [table], function(err, result) {
      // this callback was passed all the way from the controller, through the model
      onResult(err, result);
    })
  },
  insertInto: function(table, columns, values, onResult) {
    const query = "INSERT INTO ?? (??) VALUES (?)";
    connection.query(query, [table, columns, values] , function(err, result) {
      // now we pass the result back in our callback
      console.log(err)
      onResult(err, result);
    })
  },
  update: function(table, column, value, id, onResult) {
    const query = 'UPDATE ?? SET ?? = ? WHERE id = ?'
    connection.query(query, [table, column, value, id], function(err, result) {
      console.log(err)
      onResult(err, result);
    })
  },
  delete: function(table, id, onResult) {
    const query = "DELETE FROM ?? WHERE id = ?"
    connection.query(query, [table, id], function(err, result) {
      onResult(err, result);
    })
  }
}

module.exports = orm;