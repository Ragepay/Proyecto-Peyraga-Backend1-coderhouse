import express from 'express'
import { __dirname } from './utils.js';
import productsRoute from './routes/products.router.js'

/*
import productsRoute from './routes/products.router.js'
import cartsRoute from './routes/carts.router.js'
*/
const PORT = 8080;
const app = express();

//  Middlewares
//  Middleware de Express.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//  Endpoints para productos y carritos.
app.use('/api/products', productsRoute) //   Generando el endpoint a la ruta del archivo products.
/*
app.use('/api/carts', cartsRoute)
*/



app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}.`);
});
