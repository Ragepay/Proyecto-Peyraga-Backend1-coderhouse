const socket = io(); // Esto ejecuta la conexion de parte del cliente.
const boxProducts = document.querySelector(".boxProducts");

socket.on("home", (data) => {   // Escucho/recibo la informacion del servidor por medio de un evento personalizado.
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

        div.appendChild(titulo)
        div.appendChild(id)
        div.appendChild(descripcion)
        div.appendChild(precio)
        div.appendChild(stock)
        boxProducts.appendChild(div)
    });

});

