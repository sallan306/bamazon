//-------------------------------reuired packages-------------------------

var mysql = require("mysql");
var inquirer = require("inquirer");
var cliFormat = require('cli-format');

//--------------------------------------------Connect to mysql-------------------//

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Scooters1!!",
    database: "bamazon_db"
});
connection.connect(function(err) {
    if (err) {throw err};
    console.log(`onnected as id ${connection.threadId} \n`);
    listAllProducts();
});
//---------------------------------VARIABLES/CONSTANTS-------------------------------------//
const divider = ` -----------------------------------------------------------------------------`,
      CLIconfig = { width: 100, filler: '.', paddingLeft: ' | ' , paddingRight: ' | '},
      header = cliFormat.columns.wrap(["NAME","DEPARTMENT","QUANTITY","PRICE"], CLIconfig)

//------------------------------------------------FUNCTIONS-------------------------------------------//

//RETURNS ALL PRODUCTS FROM DATABASE
function listAllProducts(){
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      var result = ''
  
      res.forEach(element => {
            var price = element.price.toLocaleString("en-GB", {style: "currency", currency: "USD", minimumFractionDigits: 2})
            result += cliFormat.columns.wrap([element.item,element.department,element.quantity.toString(),price], CLIconfig) + "\n";
          })
      console.log(header);
      console.log(divider);
      console.log(result);
      console.log(divider);
      whatProductToBuy()
    });
  }

function whatProductToBuy(){
    inquirer.prompt([{  type: "input",
    name: "inquireItem",
    message: "Which item would you like to buy?"},

    {type: "input",
    name: "inquireQuantity",
    message: "How many would you like to buy?"}
    ]).then(function(response) {
        var sum = 0;
        connection.query("SELECT quantity, price FROM products WHERE item = '"+response.inquireItem+"'", function(err,result) {
            sum = result[0].quantity - parseInt(response.inquireQuantity)
            
            if (sum >= 0) {
                var cost = response.inquireQuantity * result[0].price
                var tempItem = response.inquireItem
                inquirer.prompt([{  type: "confirm",
                name: "inquireDecision",
                message: "cost is: " + cost.toLocaleString("en-GB", {style: "currency", currency: "USD", minimumFractionDigits: 2}) + ". Do you accept?"
                }]).then(function(response){
                    if (response.inquireDecision) {
                        console.log("sum: "+sum)
                        var query = "UPDATE products SET products.quantity = "+sum+" WHERE products.item = '"+tempItem+"'"
                        connection.query(query, function(err,result){})
                        console.log("Purchased, thank you!")
                        setTimeout(listAllProducts,800)
                    }
                    else {
                        console.log("returning to the main menu...")
                        setTimeout(listAllProducts,800)
                    }
                })
                
                
            }
            else {
                console.log("I'm sorry, we do not have enough in stock, please try again later")
                setTimeout(listAllProducts,800)
            }
        })


    })

}



//list products that have a quantity less than 5
function listLowStockProducts(){
  connection.query("SELECT * FROM products WHERE quantity < 5", function(err, res) {
    if (err) throw err;
    var result = ''

    res.forEach(element => {
          var price = element.price.toLocaleString("en-GB", {style: "currency", currency: "USD", minimumFractionDigits: 2})
          result += cliFormat.columns.wrap([element.item,element.department,element.quantity.toString(),price], CLIconfig) + "\n";
        })
    console.log(header);
    console.log(divider);
    console.log(result);
    console.log(divider);
  });
}
function addToInventory() {
  inquirer.prompt([{  type: "input",
                      name: "inquireItem",
                      message: "Which item would you like to add more of?"},

                      {type: "input",
                      name: "inquireQuantity",
                      message: "Quantity to add?"}
  ]).then(function(response) {
    var sum = 0;
    connection.query("SELECT quantity FROM products WHERE item = '"+response.inquireItem+"'", function(err,result) {
      // console.log("result: "+result)
      console.log("quantity before: "+result[0].quantity)
      sum = result[0].quantity + parseInt(response.inquireQuantity)
      console.log("sum: "+sum)
    })
    var query = "UPDATE products SET products.quantity = "+sum+" WHERE products.item = '"+response.inquireItem+"'"
    connection.query(query, function(err,result){})
    connection.query("SELECT quantity FROM products WHERE item = '"+response.inquireItem+"'", function(err,result) {
      console.log("new amount: "+result[0].quantity)
    })
  })
}
//function that enters an inqurer input chain that gets an item name, department, quantity,
//and price and stores the data in as values to be passed to the addProduct() function
function makeNewProduct() {
  inquirer.prompt([{  type: "input",
                      name: "inquireItem",
                      message: "Item name?"},

                      {type: "input",
                      name: "inquireDepartment",
                      message: "Department?"},

                      {type: "input",
                      name: "inquireQuantity",
                      message: "How many?"},

                      {type: "input",
                      name: "inquirePrice",
                      message: "Price?"}

]).then(function(response) {
    addProduct( response.inquireItem, 
                response.inquireDepartment, 
                parseInt(response.inquireQuantity), 
                parseFloat(response.inquirePrice));
  });
}
//function that runs after product info has been submitted by makeNewProduct()
//adds the information gathered to the mySQL database
function addProduct(item, department, quantity, price){
  connection.query("INSERT INTO products SET ?",[{item,
                                                  department,
                                                  quantity,
                                                  price}
    ], function(){
      console.log("NEW THING LISTED");
    });
};

//exit the application
function quit(){
  console.log("BYEEEEEEEEE")
  connection.end();
}
