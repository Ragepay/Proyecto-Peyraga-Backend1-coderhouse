import { Router } from "express";

const router = Router();

let BBDD = [
    {
        id: 1,
        title: "Smartphone Galaxy S22",
        description: "El nuevo Smartphone Galaxy S22 con pantalla AMOLED y cámara de 108 MP.",
        code: "SGS22-001",
        price: 1200,
        status: true,
        stock: 50,
        categoria: "Electrónica"
    },
    {
        id: 2,
        title: "Portátil Ultrabook X1",
        description: "Portátil ultraligero con pantalla táctil de alta resolución y procesador Intel Core i7.",
        code: "ULTRAX1-001",
        price: 1800,
        status: true,
        stock: 20,
        categoria: "Informática"
    },
    {
        id: 3,
        title: "Sneakers AirMax 2023",
        description: "Zapatillas deportivas con tecnología de amortiguación Air y diseño ergonómico para máximo confort.",
        code: "AIRMAX23-001",
        price: 150,
        status: true,
        stock: 100,
        categoria: "Calzado"
    }
]
let id = 0;


// Listar todos los productos de la BBDD.
router.get('/', (req, res) => {
    try {
        res.status(200).json(BBDD);
    } catch (error) {
        console.error('Error al leer la base de datos:', error);
        res.status(400).json({ error: 'No se pudieron listar los productos' });
    }
});

//  Mostrar producto por parametro de la BBDD.
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const product = BBDD.find(p => p.id == id);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error al leer la base de datos:', error);
        res.status(400).json({ error: 'No se pudo mostrar el producto.' });
    }
});

//  Añadir producto a la BBDD.
router.post('/', (req, res) => {
    try {
        // Acá recibimos todo lo que venga desde BODY.
        const usuario = req.body
        // Codigo a guardar en nuetra base de datos.
        id = BBDD.length + 1;
        BBDD.push({
            ...usuario,
            id
        });

        // respuesta de que salio todo ok
        res.status(200).json({
            ...usuario,
            mensaje: 'Se subio este usuario y funciono tood bien.',
        })
    } catch (error) {
        console.error('Error al leer la base de datos:', error);
        res.status(400).json({ error: 'No se pudo mostrar el producto.' });
    }
})

//  Actualizar producto en la BBDD.
router.put('/', (req, res) => {
    try {

    } catch (error) {

    }
})

//  Eliminar un producto por parametro.
router.delete('/:id', (req, res) => {
    try {
        //  Almacenamos el parametro en id
        const { id } = req.params;
        //  Almacenamos el producto eliminado para mostrarlo en la respuesta para sabe rque se eliminó.
        const product = BBDD.find(p => p.id == id);
        //  Filtramos el array eliminando por id.
        const productosFiltrados = BBDD.filter(p => p.id != id);
        //
        BBDD = [...productosFiltrados];

        res.status(200).json({
            ...product,
            mensaje: 'Se elimino este producto.',
        })
    } catch (error) {
        console.error('Error al leer la base de datos:', error);
        res.status(400).json({ error: 'No se pudo eliminar el producto.' });
    }


})
export default router;