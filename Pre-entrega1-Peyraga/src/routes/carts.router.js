import { Router } from "express";
import { __dirname } from '../utils.js';
import CartManager from '../class/cartsManager.js';

const router = Router();

const cartsManager = new CartManager(__dirname + '/data/carts.json');



// Ruta GET /:id para listar los productos de un carrito específico
router.get('/:id', async (req, res) => {
    console.log("Entró al get.")

    const { id } = req.params;
    try {   
        const carrito = await cartsManager.obtenerCarrito(id);
        if (carrito) {
            res.status(200).json(carrito);
        } else {
            res.status(404).json({ error: `No se encontró un carrito con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

// Crear un nuevo carrito mandando un array de productos(objetos).
router.post('/', async (req, res) => {
    
    try {
        const productos = req.body;
        const nuevoCarrito = await cartsManager.crearCarrito(productos); // Crea el carrito con los productos recibidos
        res.status(201).json({ message: "Carrito creado", cart: nuevoCarrito });
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

// Ruta POST /:id/producto/:productId para agregar un producto a un carrito específico
router.post('/:id/producto/:productId', async (req, res) => {


    const { id, productId } = req.params;
    try {
        const carritoActualizado = await cartsManager.agregarProdCart(id, productId);
        if (carritoActualizado) {
            res.status(200).json({ mensaje: `Producto con ID ${productId} agregado al carrito con ID ${id}` });
        } else {
            res.status(404).json({ error: `No se encontró un carrito con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});

export default router;