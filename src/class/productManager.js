import fs from 'node:fs'

class ProductManager {
    constructor(path) {
        this.path = path;
        this.listaProductos = [];

    }

    async obtenerProductos(){
        const LISTA = await fs.promises.readFile(this.path, 'utf-8');
        this.listaProductos = JSON.parse(LISTA).data;
        return  [...this.listaProductos]
    
    }

    async agregarProducto(producto) {
        await this.obtenerProductos();
        // Generar un ID único
        let nuevoId;
        if (this.listaProductos.length > 0) {
            nuevoId = this.listaProductos[this.listaProductos.length - 1].id + 1;
        } else {
            nuevoId = 1;
        }
        
        const productoNuevo = { id: nuevoId, ...producto };
            this.listaProductos.push(productoNuevo);
        
        await fs.promises.writeFile(this.path, JSON.stringify({data:this.listaProductos}))
    }

    async guardarProductos() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify({ data: this.listaProductos }, null, 2));
        } catch (error) {
            console.error('Error al escribir en el archivo:', error);
        }
    }

    async actualizarProducto(id, datosActualizar) {
        await this.obtenerProductos();

        // Buscar el producto por su ID
        const productoIndex = this.listaProductos.findIndex(p => p.id === parseInt(id, 10));

        if (productoIndex !== -1) {
            // Actualizar el producto sin modificar el ID
            this.listaProductos[productoIndex] = {
                ...this.listaProductos[productoIndex],
                ...datosActualizar
            };

            await this.guardarProductos();
            return true; // Indicar que se actualizó correctamente
        }

        return false; // Indicar que no se encontró el producto con el ID dado
    }

    async eliminarProducto(id) {
        await this.obtenerProductos();

        // Filtrar la lista de productos para eliminar el producto con el ID dado
        const productosFiltrados = this.listaProductos.filter(p => p.id !== parseInt(id, 10));

        if (productosFiltrados.length < this.listaProductos.length) {
            this.listaProductos = productosFiltrados;
            await this.guardarProductos();
            return true; // Indicar que se eliminó correctamente
        }

        return false; // Indicar que no se encontró un producto con el ID dado
    }
}

export default ProductManager 