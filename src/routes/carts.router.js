import { Router } from "express";
import { CartsModel } from '../model/carts.model.js';

const app = Router();

// Ruta GET /:id para listar los productos de un carrito específico
app.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const carrito = await CartsModel.findById(id);
        if (carrito) {
            res.status(200).json({ status: "Success", payload: carrito });
        } else {
            res.status(404).json({ error: `No se encontró un carrito con ID ${id}` });
        }
    } catch (error) {
        res.status(500).json({ error: `No se encontró un carrito con ID ${id}` });
    }
});

// Crear un nuevo carrito mandando un array de productos(objetos).
app.post('/', async (req, res) => {
    const productos = req.body;
    try {
        const nuevoCarrito = await CartsModel.create(productos); // Crea el carrito con los productos recibidos
        res.status(201).json({ message: "Carrito creado.", Carrito: nuevoCarrito });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito.' });
    }
});

// Ruta POST /:id/producto/:productId para agregar un producto a un carrito específico.
app.post('/:id/products/:pid', async (req, res) => {
    const { id, pid } = req.params;

    try {
        // Buscar el carrito por ID
        let carrito = await CartsModel.findById(id);

        if (!carrito) {
            return res.status(404).json({ error: `No se encontró un carrito con ID ${id}` });
        }

        // Verificar si el producto ya está en el carrito
        const productoIndex = carrito.products.findIndex(product => product._id.equals(pid));

        if (productoIndex !== -1) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            carrito.products[productoIndex].quantity += 1;
        } else {
            // Si el producto no está en el carrito, agregarlo con cantidad 1
            carrito.products.push({ _id: pid, quantity: 1 });
        }

        // Guardar el carrito actualizado
        await carrito.save();

        res.status(200).json({
            mensaje: `Producto con ID ${pid} agregado al carrito con ID ${id}`,
            carrito: carrito
        });
    } catch (error) {

        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});

// Metodo Delete para eliminar el producto en su totalidad.
app.delete('/:id/products/:pid', async (req, res) => {
    const { id, pid } = req.params;
    try {
        // Buscar el carrito por ID
        let carrito = await CartsModel.findById(id);

        if (!carrito) {
            return res.status(404).json({ error: `No se encontró un carrito con ID ${id}` });
        }
        //  Eliminacion del producto en su totalida de cantidad.
        carrito.products = carrito.products.filter(p => !p._id.equals(pid));

        //  Guardar el carrito.
        await carrito.save();
        res.status(200).json({
            mensaje: `Producto con ID ${pid} eliminado del carrito con ID: ${id}`,
            carrito: carrito
        });

    } catch (error) {
        res.status(500).json({ error: `Error al ELIMNAR el producto completo del carrito con ID: ${id}` });
    }

});

app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await CartsModel.findByIdAndDelete(id);
        let carrito = await CartsModel.create({ _id: id });
        res.status(201).json({
            mensaje: `Productos eliminados del carrito con ID: ${id}`,
            carrito: carrito
        });
    } catch (error) {
        res.status(500).json({ error: `Error al ELIMNAR los productos del carrito con ID: ${id}` });
    }

});

app.put('/:id', async (req, res) => {

});

app.put('/:id/products/:pid', async (req, res) => {

});

export default app;