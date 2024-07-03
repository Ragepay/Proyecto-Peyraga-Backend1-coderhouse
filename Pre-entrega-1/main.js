const express = require('express')
const carts = require("./routes/carts")
const products = require("./routes/products")
const port = 8080;

const app = express();


// RUTAS

app.use("/api/products",products)
app.use("/api/carts",carts)
 

// Puerto. 8080
app.listen(port,()=>{
    console.log('servidor listo.');
})
