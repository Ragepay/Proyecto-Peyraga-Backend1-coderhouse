import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';

//  Routes
import productsRoute from './routes/products.router.js';
import cartsRoute from './routes/carts.router.js';
import homeRoute from './routes/home.router.js'
import realTimeProductsRoute from './routes/realTimeProducts.router.js'

//  Class
import ProductManager from './class/productManager.js';

const PORT = 8080;
const app = express();
const productManager = new ProductManager(__dirname + '/data/products.json');

//  Handlebars.
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Middleware para parsear JSON y URLencoded.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta Satatica Public
app.use(express.static(__dirname + '/public'))

//  Routes con sus endpoints.
app.use('/api/products', productsRoute);
app.use('/api/carts', cartsRoute);
app.use('/', homeRoute);
app.use('/realtimeproducts', realTimeProductsRoute)

//  Listen HTTP
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor ON, PORT: ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {    // Nombre del evento que queremos conectar, y un socket(callback)
    console.log("Dispositivos conectados: " + socketServer.engine.clientsCount);  //    Ver los dispositivos conectados.
    const listaProductos = await productManager.obtenerProductos();
    socket.emit("home", listaProductos);
    socket.emit("realTimeProducts", listaProductos);
    socket.on("newProducto", async (producto) => {
        await productManager.agregarProducto(producto);
        socket.emit("realTimeProducts", listaProductos);
    });
    socket.on("eliminarProducto", async (id) => {
        await productManager.eliminarProducto(id);
        socket.emit("realTimeProducts", listaProductos);
    });

});

