const express = require('express')
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');
const { finished } = require('stream');
var SERVER_NAME = 'products'
var PORT = 3009;
var HOST = '127.0.0.1';
var getCounter = 0;
var postCounter = 0;


app.use(bodyParser.json())
app.get('/products', (requ, resp) => {
    getCounter += 1;
    console.log("User GET request")
    console.log("GET counter: " + getCounter);
    const products = JSON.parse(fs.readFileSync('products.json'));
    resp.send(products);
});

app.get('/products/:ID', (requ, resp) => {
    getCounter += 1;
    console.log("User GET request by ID " + requ.params);
    console.log("GET counter: " + getCounter);
    const products = JSON.parse(fs.readFileSync('products.json'));
    var userProduct = "not found :(";
    for (var product in products) {
        if (products[product].ID == requ.params.ID) {
            userProduct = products[product];
            console.log("Product found.")
        }
    }
    resp.send(JSON.stringify(userProduct));
    console.log("result: " + JSON.stringify(userProduct))
});

app.post('/products', (requ, resp, next) => {
    postCounter += 1;
    resp.send("POST worked");
    console.log("User POST request.")
    console.log("POST counter: " + postCounter);
    console.log("request body: " + JSON.stringify(requ.body))
    const products = JSON.parse(fs.readFileSync('products.json'));
    var productsArray = Array.from(products)


    var newProduct = {
        Product: requ.body.Product,
        Company: requ.body.Company,
        Seller: requ.body.Seller,
        Source: requ.body.Source,
        Available: requ.body.Available,
        ID: requ.body.ID
    }
    console.log(newProduct)

    if (requ.body.Product === undefined) {
        // If there are any errors, pass them to next in the correct format
        return next(console.log('product must be supplied'))
    }
    if (requ.body.Seller === undefined) {
        // If there are any errors, pass them to next in the correct format
        return next(console.log('seller must be supplied'))
    }
    productsArray.push(newProduct);
    console.log(productsArray)

    console.log("conditions passed")
    fs.writeFileSync('products.json', JSON.stringify(productsArray, null, 2), finished);
});

app.delete('/products', (requ, resp) => {
    console.log("User DELETE request.");
    const products = JSON.parse(fs.readFileSync('products.json'));
    fs.copyFileSync("products.json", "products_BACKUP.json", (err) => {
        if (err) {
            console.log("Error:", err);
        }
    });
    fs.writeFileSync('products.json','[]',finished);
    console.log("records deleted!");
});

app.listen(3009, () => console.log('Server %s listening at %s on port %s', SERVER_NAME, HOST, PORT))
console.log('Resources:')
console.log('/products')
console.log('/products/:id')



