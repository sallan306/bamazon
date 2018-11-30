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

//INJECTS USER INPUT INTO DATABASE

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
//exit the application
function exiteBoy(){
  console.log("BYEEEEEEEEE")
  connection.end();
}

//Opening function that begins by asking the user for the choices below
function mainMenu() {
  inquirer.prompt([{  type: "list",
                      name: "UserChoicePrompt",
                      message: "What would you like to do?",
                      choices: ["View Products for Sale",
                                "View Low Inventory",
                                "Add to Inventory",
                                "Add New Product",
                                "Exit"]}
  ]).then(function(user) {
    const userC = user.UserChoicePrompt;
    if      (userC === "View Products for Sale")  {listAllProducts()}
    else if (userC === "View Low Inventory")      {listLowStockProducts()}//-----------------------make a new function that only displays low inventory items
    else if (userC === "Add to Inventory")        {chooseBidPrompt()}//-------------------------------function should select an item and "restock" it
    else if (userC === "Add New Product")         {makeNewProduct()}   
    else if (userC === "Exit")                    {exiteBoy()}        
  });
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
    // newItemName = user.inquireItem
    // newItemDepartment = user.inquireDepartment
    // newItemQuantity = parseInt(user.inquireQuantity);
    // newItemPrice = parseInt(user.inquirePrice);
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