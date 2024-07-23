const socket = io();
const boxProducts = document.querySelector(".boxProducts");


socket.on("realTimeProducts", (data) => {   // Escucho/recibo la informacion del servidor por medio de un evento personalizado.
    boxProducts.innerHTML = "";
    data.forEach(element => {
        const div = document.createElement('div');
        const id = document.createElement('p')
        id.innerText = 'ID: ' + element.id;
        const titulo = document.createElement('h2')
        titulo.innerText = element.title;
        const descripcion = document.createElement('p')
        descripcion.innerText = 'Descripcion: ' + element.description;
        const precio = document.createElement('p')
        precio.innerText = 'Precio: $ ' + element.price;
        const stock = document.createElement('p')
        stock.innerText = 'Stock: ' + element.stock;

        div.appendChild(titulo);
        div.appendChild(id);
        div.appendChild(descripcion);
        div.appendChild(precio);
        div.appendChild(stock);
        boxProducts.appendChild(div);
    });
});

function agregarProducto() {

    const title = document.querySelector('#add-title').value
    const description = document.querySelector('#add-description').value
    const price = document.querySelector('#add-price').value
    const code = document.querySelector('#add-code').value
    const stock = document.querySelector('#add-stock').value
    const category = document.querySelector('#add-category').value

    const producto = { title, description, price, code, stock, category }
    socket.emit("newProducto", producto)

    document.querySelector('#add-title').value = ""
    document.querySelector('#add-description').value = ""
    document.querySelector('#add-price').value = ""
    document.querySelector('#add-code').value = ""
    document.querySelector('#add-stock').value = ""
    document.querySelector('#add-category').value = ""
}

function eliminarProducto() {
    const id = document.querySelector('#delete-id').value
    socket.emit("eliminarProducto", id)
    document.querySelector('#delete-id').value = ""
}