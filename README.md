# bamazon

### App Description:

This application is a command line based storefront that uses the [Inquirer](https://www.npmjs.com/package/inquirer) NPM package and a MySQL database together with a [MySQL](https://www.npmjs.com/package/mysql) NPM package. The app takes in orders from customers and depletes stock from the store's inventory.


### Interface:

When running the app, a customer is first given all of the items available for sale including the ids, names, prices and stock amount of products for sale. The user is then given two prompts: first asking what item they would like to buy then how many they want to purchase.

If the selected quantity is in stock, the user's order is fulfilled and they are shown the item they chose plus the cost of that item. They're also showed the new stock amount plus that number is updated in the database.

If the desired quantity isn't available, the user is prompted to modify their order.

### Demo:

Watch the demo to the bamazon customer interface [here.](https://drive.google.com/file/d/1gYyD06qjvUDW1RP7c4SJxvcaeKh-wDZI/view)
