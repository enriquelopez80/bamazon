const mysql = require("mysql");
const inquirer = require("inquirer");

//create connection with bamazon
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

function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(function (product) {
            console.log(`
            Product:
            =========================
            ID: ${product.item_id}
            NAME: ${product.product_name}
            PRICE: $${product.price}
            STOCK: ${product.stock_quantity}
            `)
        })
        productSearch()
    })
}

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

        connection.query('SELECT * FROM products WHERE ?', {
            item_id: item
        }, function (err, res) {
            if (err) throw err;
            res.forEach(function (product) {
                console.log(`
            Product:
            =========================
            ID: ${product.item_id}
            NAME: ${product.product_name}
            PRICE: $${product.price}
            STOCK: ${product.stock_quantity}
            `)

                let itemRes = res[0]

                if (quantity <= itemRes.stock_quantity) {
                    console.log('Looks like we have enough!')

                    let transactionCost = (product.price * quantity)

                    console.log("Total cost of purchase: $ " + transactionCost)

                } else {
                    console.log("Sorry we don't have enough.")
                    productSearch()
                }

                connection.query('UPDATE products SET ? WHERE ?', [{
                        stock_quantity: product.stock_quantity - quantity
                    },
                    {
                        item_id: item
                    }
                ], function (err, res) {
                    if (err) throw err;
                    
                    productSearch()
                })
            })
        })
    })
}