// Establishing connection to sql, requiring sql & inquirer package, connecting to proper database
var mysql = require("mysql");
var inquirer = require("inquirer");

var whatYouOwe;
var currentDept;
var updateSales;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  
  user: "root",

  
  password: "ucSD10242018",
  database: "bamazondb"
});
// If failure, throw error
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  
});
// Initiliazing store and its functions wrapped in a function.
function productDisplay(){
	connection.query('SELECT * FROM products', function(err, res){
		if (err) throw err;
		console.log('This is Bamazon');
		console.log('Welcome to Bamazon');
		console.log('Bamazon #1 node based Amazon knock off');
		// Cycling and returning properties from table in the database
		for(i=0;i<res.length;i++){
			console.log('ID:' + res[i].id + ' product_name: ' + res[i].product_name + ' price: ' + '$' + res[i].price + '(Quantity left: ' + res[i].stock_quantity + ')')
		}
		console.log('=================================================');
		purchaseOrder();
		})
}

// Inquirer prompts inside po function, match method searches for match against value
function purchaseOrder(){
	inquirer.prompt([{
		name: 'selectId',
		message: 'What is the ID of the product you want to purchase?',
		validate: function(value){
			var valid = value.match(/^[0-9]+$/)
			if(valid){
				return true
			}
				return 'Invalid Entry'
		}
	},{
		name:'selectQuantity',
		message: 'How many units of this product would you like to purchase?',
		validate: function(value){
			var valid = value.match(/^[0-9]+$/)
			if(valid){
				return true
			}
				return 'Invalid Entry'
		 }             
		 // Promise to varify value in stock_quantity property with user input and cancel order if input exceeds integer or success if not
	}]).then(function(answer){
	connection.query('SELECT * FROM products WHERE id = ?', [answer.selectId], function(err, res){
		if(answer.selectQuantity > res[0].stock_quantity){
			console.log('Insufficient Quantity');
			console.log('Order cancelled');
			console.log('');
			newOrder();
			
		}
		else{
			whatYouOwe = res[0].price * answer.selectQuantity;
			currentDept = res[0].dept_name;
			console.log('Your order is complete!');
			console.log('Your balance $' + whatYouOwe);
			console.log('');
			
			connection.query('UPDATE products SET ? Where ?', [{
				stock_quantity: res[0].stock_quantity - answer.selectQuantity
			},{
				id: answer.selectId
			}], function(err, res){});
			
			enterToDept();
			newOrder();
			
		}
	})

}, function(err, res){})
};


function newOrder(){
	inquirer.prompt([{
		type: 'confirm',
		name: 'choice',
		message: 'Continue shopping?'
	}]).then(function(answer){
		if(answer.choice){
			purchaseOrder();
		}
		else{
			console.log('Thank you, come again');
			connection.end();
		}
	})
};
//Query to take parameters for dept property from db table in conjunction with response
function enterToDept(){
	connection.query('SELECT * FROM dept_name WHERE dept_name = ?', [currentDept], function(err, res){
		updateSales = res[0].TotalSales + whatYouOwe;
		updateDept();
	})
};
//Query to update sales from dept
function updateDept(){
		connection.query('UPDATE dept_name SET ? WHERE ?', [{
		TotalSales: updateSales
	},{
		dept_name: currentDept
	}], function(err, res){});
};



productDisplay();