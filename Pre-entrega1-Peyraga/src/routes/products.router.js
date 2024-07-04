import { Router } from "express";
import { __dirname } from '../utils.js';
import ProductManager from '../class/productManager.js';

const router = Router();

const productManager = new ProductManager(__dirname + '/data/products.json');



// Listar todos los productos de products.json
router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit, 10);
    const productLista = await productManager.obtenerProductos();

    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json( productLista.slice(0, limit));
    }
    res.status(200).json(productLista);
})

//  Añadir producto a products.json
router.post('/', async (req, res) => {
    const { title, description, code, price, stock, categoria } = req.body;
    let { status, thumbnails } = req.body;

    // Establecer valor predeterminado para status si no se proporciona
    if (status === undefined) {
        status = true;
    }

    // Validar los datos requeridos
    if (!title || !description || !code || !price || !stock || !categoria) {
        return res.status(400).json({ error: 'Datos incompletos o inválidos.' });
    }

    try {
        await productManager.agregarProducto({ title, description, code, price, status, stock, categoria, thumbnails });
        res.status(201).json({ mensaje: "Producto añadido." });
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
})

//  Metodos con parametros.
//  Mostrar producto por parametro de products.json
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const productLista = await productManager.obtenerProductos();
        const producto = productLista.find(p => p.id == id);

        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ error: `No se encontró un producto con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
})

// Actualizar un producto según ID en products.json
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const datosActualizar = req.body;

    try {
        const productoActualizado = await productManager.actualizarProducto(id, datosActualizar);

        if (productoActualizado) {
            res.status(201).json({ mensaje: `Producto con ID ${id} actualizado correctamente` });
        } else {
            res.status(404).json({ error: `No se encontró un producto con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
}); 

//  Eliminar producto de products.json
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const productoEliminado = await productManager.eliminarProducto(id);

        if (productoEliminado) {
            res.status(201).json({ message: `Producto con ID ${id} eliminado correctamente` });
        } else {
            res.status(404).json({ error: `No se encontró un producto con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});
    
export default router;