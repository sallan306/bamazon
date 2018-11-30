//-------------------------------reuired packages-------------------------

var mysql = require("mysql");
var inquirer = require("inquirer");

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
    start();
});
//---------------------------------functions-------------------------------------//

// const action = process.argv[2];
const divider = `------------------------------------------------------------`;
var newItemName = "",
    newItemDepartment = "",
    newItemQuantity = "",
    newItemPrice = 0;
//------------------------------------------------FUNCTIONS-------------------------------------------//

//INJECTS USER INPUT INTO DATABASE
function addProduct(item, department, quantity, price){
  connection.query("INSERT INTO products SET ?",
    [
      {
        item,
        department,
        quantity,
        price,
      }
    ], function(err, response){
      console.log("NEW THING LISTED");
    });
};
//RETURNS ALL PRODUCTS FROM DATABASE
function listAllProducts(){
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    
    console.log(divider);
    res.forEach(element => {
      console.log(
      `${element.id}--${element.item}, : $${element.department}, : $${element.quantity}, : $${element.price}`);
    });
    console.log(divider);
    start();
  });
}
//list products that have a quantity less than 5
function listLowStockProducts(){
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    
    console.log(divider);
    res.forEach(element => {
      console.log(
      `${element.id}--${element.item}, : $${element.department}, : $${element.quantity}, : $${element.price}`);
    });
    console.log(divider);
    mainPrompt();
  });
}
//exit the application
function exiteBoy(){
  console.log("BYEEEEEEEEE")
  connection.end();
}
//---------------------------------------------INQUIRER FUNCTIONS ----------------------------------------------------------------------//

//Opening function that begins by asking the user for the choices below
function start() {
  inquirer.prompt([
    {
      type: "list",
      name: "UserChoicePrompt",
      message: "What would you like to do?",
      choices: ["View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"]
    }
  ]).then(function(user) {
    const userC = user.UserChoicePrompt;
    if (userC === "View Products for Sale") {
      listAllProducts();
    }
    else if (userC === "View Low Inventory") {
      listLowStockProducts();//-----------------------make a new function that only displays low inventory items
    }
    else if (userC === "Add to Inventory") {
      chooseBidPrompt()//-------------------------------function should select an item and "restock" it
    }
    else if (userC === "Add New Product") {
      postNamePrompt()
    }   
    else if (userC === "Exit") {
      exiteBoy();
    }        
  });
}
function addNewProductName() {
  inquirer.prompt([
    {
      type: "input",
      name: "inquireItem",
      message: "What would you like to sell?"
    }
  ]).then(function(user) {
    
    newItemName = user.inquireItem
    addNewProductDepartment()
  });
}
function addNewProductDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "inquireDepartment",
      message: "What department would you like to sell in?"
    }
  ]).then(function(user) {
    newItemDepartment = user.inquireDepartment
    addNewProductQuantity()
  });
}
function addNewProductQuantity() {
  inquirer.prompt([
    {
      type: "input",
      name: "inquireQuantity",
      message: "How many?"
    }
  ]).then(function(user) {
    newItemQuantity = user.inquireQuantity
    addNewProductPrice()
  });
}
function addNewProductPrice() {
  inquirer.prompt([
    {
      type: "input",
      name: "inquirePrice",
      message: "How much would you like to bid?"
    }
  ]).then(function(user) {
    newItemPrice = parseInt(user.inquirePrice);
    addProduct(newItemName, newItemDepartment, newItemQuantity, newItemPrice);
    start();
  });
}
function chooseBidPrompt() {
  // connection.query("SELECT * FROM items", function(err, res) {
  //   if (err) throw err;
    
  //   console.log(divider);
  //   res.forEach(element => {
  //     console.log();
  //   });
  var products = connection.query("SELECT * FROM products",function(err, res){
    
  })
    
  
  inquirer.prompt([
    {
      type: "list",
      name: "itemToBidPrompt",
      message: "Select an Item",
      choices: [products,"Exit"]
    }
  ]).then(function(user) {
    
  });
};