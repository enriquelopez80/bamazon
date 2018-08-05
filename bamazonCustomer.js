//Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

//Create connection with bamazon database
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Password123@',
    database: 'bamazon'
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAllProducts();
});

//Display all products
function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(function (product) {
            console.log(`
                    Product:
                    ==========================
                    ID: ${product.item_id}
                    NAME: ${product.product_name}
                    PRICE: $${product.price}
                    STOCK: ${product.stock_quantity}
                    `)
        })
        productSearch()
    })
}

//Prompt user
function productSearch() {
    inquirer.prompt([{
            name: "item_id",
            type: "input",
            message: "Which number product would you like to buy?"
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "How many units would you like to buy?"
        }

    ]).then(function (input) {

        let item = input.item_id;
        let quantity = input.stock_quantity;

        //Select item
        connection.query('SELECT * FROM products WHERE ?', {
            item_id: item
        }, function (err, res) {
            if (err) throw err;
            res.forEach(function (product) {
                console.log(`
                    Product:
                    ==========================
                    ID: ${product.item_id}
                    NAME: ${product.product_name}
                    PRICE: $${product.price}
                    STOCK: ${product.stock_quantity}
            `)

                let itemRes = res[0]
                
                //Stock availability and cost
                if (quantity <= itemRes.stock_quantity) {
                    console.log(`
                    ==========================
                    Looks like we have enough!
                    ==========================
                    `)

                    let transactionCost = (product.price * quantity)
                    let newStock = (product.stock_quantity - quantity)

                    console.log(`
                    ==========================
                    Total cost: $${transactionCost}
                    ==========================
                    `)
                    console.log(`
                    ==========================
                    New stock amount: ${newStock}
                    ==========================
                    `)

                    //Update database
                    connection.query('UPDATE products SET ? WHERE ?', [{
                            stock_quantity: product.stock_quantity - quantity
                        },
                        {
                            item_id: item
                        }
                    ], function (err, res) {
                        if (err) throw err;
                    })

                } else {
                    console.log(`
                    ==========================
                    Sorry we don't have enough.
                    Please modify your order.
                    ==========================
                            `)
                }
                productSearch()
            })
        })
    })
}