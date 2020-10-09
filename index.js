const express = require('express')
const app = express();
const fs = require('fs');

const products = JSON.parse(fs.readFileSync('products.json'));

console.log(products);
console.log(products[0].Source)

app.get('/', (requ,resp)=>{ resp.send('Hi !! you got something!'); } );
app.get('/products', (requ,resp)=>{  
    resp.send(products);
    console.log(requ.query);
});
app.get('/products/:id',(requ,resp)=>{  
    console.log(requ.params);
    resp.send("hello "+requ.params.id);
 }   );

app.listen(3009, ()=> console.log('server now listening at port 3009'))


