const express = require('express')
const app = express();
const fs = require('fs');

const products = JSON.parse(fs.readFileSync('products.json'));

console.log(products);
console.log(products[0].Source);

app.get('/products', (requ,resp)=>{  
    resp.send(products);
});

app.get('/products/:ID',(requ,resp)=>{  
    console.log(requ.params);
    var userProduct = "not found :(";

    for(var product in products) {
        if (products[product].ID == requ.params.ID) {
            userProduct = products[product];
        }
     }
     resp.send(JSON.stringify(userProduct, null, 2));
 });

app.listen(3009, ()=> console.log('server now listening at port 3009'))


