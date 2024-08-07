import { Router } from "express";
import { ProductsModel } from '../model/products.model.js';

const app = Router();

// Listar todos los productos de products.json
app.get('/', async (req, res) => {
    try {

        const { limit = 10, page = 1, sort = '', query = '' } = req.query;

        let filter = {};
        if (query) {
            filter = {
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                    { code: { $regex: query, $options: 'i' } },
                    { categoria: { $regex: query, $options: 'i' } }
                ]
            };
        }

        const sortOrden = {
            'asc': 1,
            'desc': -1
        }

        const options = {
            page: Number(page),
            limit: Number(limit),
            ...(sort && { sort: { price: sortOrden[sort] } })
        };

        const result = await ProductsModel.paginate(filter, options);

        const linkPage = (page) => {
            return `/api/products?limit=${limit}&page=${page}&sort=${sort}&query=${query}`;
        };

        res.status(200).json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? linkPage(result.prevPage) : null,
            nextLink: result.hasNextPage ? linkPage(result.nextPage) : null
        });


    } catch (error) {
        res.status(500).json({ status: 'Error.', message: 'Error fetching products', error });
    }

});

//  Añadir producto a products.json
app.post('/', async (req, res) => {
    const { title, description, code, price, stock, categoria } = req.body;
    let { status, thumbnails } = req.body;

    // Establecer valor predeterminado para status si no se proporciona
    if (status === undefined) {
        status = true;
    }

    // Validar los datos requeridos
    if (!title || !description || !code || !price || !stock || !categoria) {
        return res.status(400).json({ status: 'error', error: 'Datos incompletos o inválidos. Recuerda que son requeridos; title, description, code, price, stock y categoria.' });
    }

    try {
        await ProductsModel.create({ title, description, code, price, status, stock, categoria, thumbnails });
        res.status(201).json({ mensaje: "Producto añadido." });
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ error: 'Error al agregar el producto. Puede ser que este queriendo duplicar el "code" y es único.' });
    }
})



app.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const productLista = await ProductsModel.findById(id);

        if (productLista) {
            res.status(200).json(productLista);
        } else {
            res.status(404).json({ error: `No se encontró un producto con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
})

// Actualizar un producto según ID en products.json
app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, code, price, stock, categoria } = req.body;
    let { status, thumbnails } = req.body;

    if (!title || !description || !code || !price || !stock || !categoria) {
        return res.status(400).json({ status: 'error', error: 'Datos incompletos o inválidos. Recuerda que son requeridos; title, description, code, price, stock y categoria.' });
    }

    if (status === undefined) {
        status = true;
    }

    const updateData = {
        title,
        description,
        code,
        price,
        stock,
        categoria,
        status,
        thumbnails
    }

    // Opciones: Devuelve el documento actualizado
    const options = { new: true };

    try {
        const productoActualizado = await ProductsModel.findByIdAndUpdate(id, updateData, options);

        if (productoActualizado) {
            res.status(201).json({ mensaje: `Producto con ID ${id} actualizado correctamente`, producto: productoActualizado });
        } else {
            res.status(404).json({ error: `No se encontró un producto con ID ${id}` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

//  Eliminar producto de products.json
app.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const productoEliminado = await ProductsModel.findByIdAndDelete(id);

        if (productoEliminado) {
            res.status(201).json({ message: `Producto con ID ${id} eliminado correctamente` });
        } else {
            res.status(404).json({ error: `No se encontró un producto con ID ${id}` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }

});


export default app;