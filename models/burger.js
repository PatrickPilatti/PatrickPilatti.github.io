

// responsible for everything that has to do with a burger
const orm = require('../config/orm.js');

// creating a burger...

// a specific way of manipulating the db, but doesn't make SQL queries itself, 
// instead it uses the orm. All logic should go here.
const burger = {

  all: function(callback) {
    orm.selectAll('burgers', callback);
  },

  create: function(planText, callback) {
    orm.insertInto('burgers', 'burger', planText, callback);
  },

  update: function(newText, id, callback) {
    orm.update('burgers', 'burger', newText, id, callback);
  },

  delete: function(id, callback) {
    orm.delete('burgers', id, callback);
  }

}

module.exports = burger;