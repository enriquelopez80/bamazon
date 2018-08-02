const mysql = require("mysql");
const inquirer = require("inquirer");

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
        res.forEach(function (product) {
            console.log(`
            Product:
            =========================
            ID: ${product.item_id}
            NAME: ${product.product_name}
            PRICE: $${product.price}
            `)
        })
    })
}


