import { Router } from "express";
import { __dirname } from '../utils.js';
import ProductManager from '../class/productManager.js';

const router = Router();

const productManager = new ProductManager(__dirname + '/data/products.json');



// Listar todos los productos de la BBDD.
router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit, 10);
    const productLista = await productManager.obtenerProductos();

    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json( productLista.slice(0, limit));
    }
    res.status(200).json(productLista);
})

//  Añadir producto a la BBDD.
router.post('/', async (req, res) => {
    await productManager.agregarProducto(req.body);
    res.json({ mensaje: "Producto Añadido." })
})

//  Metodos con parametros.
//  Mostrar producto por parametro de la BBDD.
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const productLista = await productManager.obtenerProductos();
    const producto = productLista.find(p => p.id == id);

    res.status(200).json(producto )
})

// Ruta PUT para actualizar un producto por su ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const datosActualizar = req.body;

    try {
        const productoActualizado = await productManager.actualizarProducto(id, datosActualizar);

        if (productoActualizado) {
            res.status(200).json({ mensaje: `Producto con ID ${id} actualizado correctamente` });
        } else {
            res.status(404).json({ error: `No se encontró un producto con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
}); 


router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const productoEliminado = await productManager.eliminarProducto(id);

        if (productoEliminado) {
            res.status(200).json({ message: `Producto con ID ${id} eliminado correctamente` });
        } else {
            res.status(404).json({ error: `No se encontró un producto con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});
    
export default router;