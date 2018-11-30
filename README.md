# bamazon

This project's goal was to make a mock store server using a mySQL database and Node.js. The project is ran through bash and can execute
the following commands:

bamazonCustomer.js:
  customer can view the inventory, select the desired item, select a quantity, verify the price, and if accepted can purchase it.
  this will decriment the quantity purchased from the server value, and reflect it onscreen.
 
 bamazonManager.js:<\n>
  has a menu function that runs many various commands:
    View products for sale - similar to the customer menu, except it is called as a menu item instead of automatically appearing.
    View low stock products - will show all products that have less than a value of 5 in the quantity section
    Add to inventory - will let the "manager" choose an item to restock, then asks how many more he/she has recieved. the number will
    increment the server's total value with the updated total.
    Add new product - the manager can add a new product with the following prompted questions: name, department, quantity, and price.
    this new product is reflected in the server.

[[https://github.com/sallan306/bamazon/blob/master/CustomerExample_1.png|alt=example1]]
[[https://github.com/sallan306/bamazon/blob/master/CustomerExample_2.png|alt=example1]]
[[https://github.com/sallan306/bamazon/blob/master/ManagerExample_1.png|alt=example1]]
[[https://github.com/sallan306/bamazon/blob/master/ManagerExample_2.png|alt=example1]]
[[https://github.com/sallan306/bamazon/blob/master/ManagerExample_3.png|alt=example1]]
