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
        precio.innerText = 'Precio: u$s ' + element.price;
        const stock = document.createElement('p')
        stock.innerText = 'Stock: ' + element.stock;
        const categoria = document.createElement('p')
        categoria.innerText = 'Categoria: ' + element.categoria;

        div.appendChild(titulo)
        div.appendChild(id)
        div.appendChild(descripcion)
        div.appendChild(precio)
        div.appendChild(stock)
        div.appendChild(categoria)
        boxProducts.appendChild(div)
    });

});

function agregarProducto() {

    let title = document.querySelector('#add-title').value;
    let description = document.querySelector('#add-description').value;
    let price = document.querySelector('#add-price').value;
    let code = document.querySelector('#add-code').value;
    let stock = parseInt(document.querySelector('#add-stock').value);
    let categoria = document.querySelector('#add-category').value;

    
    if (stock <= 0){
        stock = 0;
    }

    let producto = { title, description, price, code, stock, categoria }
    socket.emit("newProducto", producto)

    document.querySelector('#add-title').value = ""
    document.querySelector('#add-description').value = ""
    document.querySelector('#add-price').value = ""
    document.querySelector('#add-code').value = ""
    document.querySelector('#add-stock').value = ""
    document.querySelector('#add-category').value = ""
}

function eliminarProducto() {
    let id = document.querySelector('#delete-id').value
    socket.emit("eliminarProducto", id)
    document.querySelector('#delete-id').value = ""
}
