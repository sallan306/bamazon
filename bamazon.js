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
    mainMenu();
});
//---------------------------------VARIABLES/CONSTANTS-------------------------------------//
const divider = ` -----------------------------------------------------------------------------`,
      CLIconfig = { width: 100, filler: '.', paddingLeft: ' | ' , paddingRight: ' | '},
      header = cliFormat.columns.wrap(["NAME","DEPARTMENT","QUANTITY","PRICE"], CLIconfig)
var newItemName = "",
    newItemDepartment = "",
    newItemQuantity = "",
    newItemPrice = 0;
//------------------------------------------------FUNCTIONS-------------------------------------------//

//Opening function that begins by asking the user for the choices below
function mainMenu() {
  inquirer.prompt([{  type: "list",
                      name: "UserChoicePrompt",
                      message: "What would you like to do?",
                      choices: ["View Products for Sale",
                                "View Low Inventory",
                                "Add to Inventory (NOT FINISHED)" ,
                                "Add New Product",
                                "Exit"]}
  ]).then(function(user) {
    const userC = user.UserChoicePrompt;
    if      (userC === "View Products for Sale")  {listAllProducts()}
    else if (userC === "View Low Inventory")      {listLowStockProducts()}
    else if (userC === "Add to Inventory (NOT FINISHED)")        {addToInventory()} // NOT DONE
    else if (userC === "Add New Product")         {makeNewProduct()}   
    else if (userC === "Exit")                    {quit()}        
  });
}

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
    mainMenu();
  });
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
    mainMenu();
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
      mainMenu();
    });
};

//exit the application
function quit(){
  console.log("BYEEEEEEEEE")
  connection.end();
}
