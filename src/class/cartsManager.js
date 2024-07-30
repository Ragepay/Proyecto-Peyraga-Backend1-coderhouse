import fs from 'node:fs';

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
    }

    async obtenerCarritos() {
        const LISTA = await fs.promises.readFile(this.path, 'utf-8');
        this.carts = JSON.parse(LISTA).data;
        
        return [...this.carts];
    }

    async crearCarrito(productos) {
        await this.obtenerCarritos();

        // Generar un ID único para el nuevo carrito
        const nuevoId = this.carts.length > 0 ? this.carts[this.carts.length - 1].id + 1 : 1;

        // Crear el nuevo carrito con el ID y los productos recibidos
        const nuevoCarrito = {
            id: nuevoId,
            products: [...productos]
        };

        // Agregar el nuevo carrito al arreglo de carritos
        this.carts.push(nuevoCarrito);

        // Guardar el arreglo actualizado en el archivo JSON
        await fs.promises.writeFile(this.path, JSON.stringify({ data: this.carts }));

        return nuevoCarrito;
    }

    async obtenerCarrito(id) {
        await this.obtenerCarritos();
        return this.carts.find(cart => cart.id == id);
    }

    async agregarProdCart(id, productId) {
        await this.obtenerCarritos();
        const carritoIndex = this.carts.findIndex(cart => cart.id == id);
        if (carritoIndex === -1) return null;

        const cart = this.carts[carritoIndex];
        const productIndex = cart.products.findIndex(prod => prod.id == productId);
        if (productIndex === -1) {
            cart.products.push({ id: productId, quantity: 1 });
        } else {
            cart.products[productIndex].quantity += 1;
        }
        this.carts[carritoIndex] = cart;
        await fs.promises.writeFile(this.path, JSON.stringify({ data: this.carts }));
        return cart;
    }
}

export default CartManager;