const express = require('express')
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');
var SERVER_NAME = 'products'
var PORT = 3009;
var HOST = '127.0.0.1';

const products = JSON.parse(fs.readFileSync('products.json'));

console.log(products);

app.use(bodyParser.json())
app.get('/products', (requ,resp)=>{  
    resp.send(products);
    console.log("User get request")
});

app.get('/products/:ID',(requ,resp)=>{  
    console.log("User get request by ID "+requ.params);
    var userProduct = "not found :(";
    for(var product in products) {
        if (products[product].ID == requ.params.ID) {
            userProduct = products[product];
            console.log("Product found.")
        }
     }
     resp.send(JSON.stringify(userProduct));
     console.log("result: "+JSON.stringify(userProduct))
 });

 app.post('/products', (requ,resp,next)=>{
     resp.send("post worked yasta");
     console.log("User Post request.")
     console.log("request body: "+JSON.stringify(requ.body))

     var newProduct = {
		Product: requ.body.Product, 
        Company: requ.body.Company,
        Seller: requ.body.Seller,
        Source: requ.body.Source,
		Available: requ.body.Available,
		ID: requ.body.ID
    }
    console.log(newProduct)

     if (requ.body.Product === undefined ) {
        // If there are any errors, pass them to next in the correct format
        return next(console.log('product must be supplied'))
      }
      if (requ.body.Seller === undefined ) {
        // If there are any errors, pass them to next in the correct format
        return next(console.log('seller must be supplied'))
      }
      console.log("conditions passed")
    //fs.writeFile('products.json',Json.stringify(newProduct))
 });

app.listen(3009, ()=>   console.log('Server %s listening at %s on port %s', SERVER_NAME, HOST, PORT))
console.log('Resources:')
console.log('/products')
console.log('/products/:id')

