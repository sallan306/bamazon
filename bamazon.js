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
    mainPrompt();
});
//---------------------------------functions-------------------------------------//

const action = process.argv[2];
const divider = `------------------------------------------------------------`;
var postName = "",
    postDepartment = "",
    bidAmount = 0;
//------------------------------------------------FUNCTIONS-------------------------------------------//
//PLACING BID, UPDATES ITEM's CURRENT BID
function bid(id, bidAmmount){
  connection.query("UPDATE products SET ? WHERE ?"), [
    {
      bid: bidAmmount
    },
    {
      id: id
    }
  ],function(err, result){
    if (err) throw err;
    console.log("Posting a bid");
  }
}
//LISTING NEW AUCTION, INJECTS USER INPUT INTO DATABASE
function postAuction(name, department, bid){
  connection.query("INSERT INTO products SET ?",
    [
      {
        name,
        department,
        bid
      }
    ], function(err, result){
      console.log("NEW THING LISTED");
    });
};
//RETURNS ALL AUCTIONS FROM DATABASE
function listAllAuctions(){
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    
    console.log(divider);
    res.forEach(element => {
      console.log(
      `${elemenbt.id}--${element.name}, : $${element.bid}`);
    });
    console.log(divider);
    mainPrompt();
  });
}
function exiteBoy(){
  console.log("BYEEEEEEEEE")
  connection.end();
}
//---------------------------------------------INQUIRER FUNCTIONS ----------------------------------------------------------------------//
function mainPrompt() {
  inquirer.prompt([
    {
      type: "list",
      name: "UserChoicePrompt",
      message: "What would you like to do?",
      choices: ["Bid","List Auction Items","Post Auction Item","Exit"]
    }
  ]).then(function(user) {
    const userC = user.UserChoicePrompt;
    if (userC === "Bid") {
      // Auction selection?
      // bid
    }
    else if (userC === "List Auction Items") {
      listAllAuctions();
    }
    else if (userC === "Post Auction Item") {
      postNamePrompt();
    }
    else if (userC === "Exit") {
      exiteBoy();
    }        
  });
}
function postNamePrompt() {
  inquirer.prompt([
    {
      type: "input",
      name: "postNamePrompt",
      message: "What would you like to sell?"
    }
  ]).then(function(user) {
    
    postName = user.postNamePrompt
    postDepartmentPrompt()
  });
}
function postDepartmentPrompt() {
  inquirer.prompt([
    {
      type: "input",
      name: "postDepartmentPrompt",
      message: "What department would you like to sell in?"
    }
  ]).then(function(user) {
    postDepartment = user.postDepartmentPrompt
    bidAmountPrompt()
  });
}
function bidAmountPrompt() {
  inquirer.prompt([
    {
      type: "input",
      name: "bidAmountPrompt",
      message: "How much would you like to bid?"
    }
  ]).then(function(user) {
    bidAmount = parseInt(user.bidAmountPrompt);
    postAuction(name, department, bid);
    listAllAuctions();
    mainPrompt();
  });
}
// function chooseBidPrompt() {
//   // connection.query("SELECT * FROM items", function(err, res) {
//   //   if (err) throw err;
    
//   //   console.log(divider);
//   //   res.forEach(element => {
//   //     console.log();
//   //   });
//   var products = connection.query("SELECT * FROM products",function(err, res){
    
//   })
// }
    
  
  inquirer.prompt([
    {
      type: "list",
      name: "itemToBidPrompt",
      message: "What would you like to do?",
      choices: [products,"Exit"]
    }
  ]).then(function(user) {
    
  });
};