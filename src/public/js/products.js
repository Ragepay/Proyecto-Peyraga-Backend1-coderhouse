const url = 'http://localhost:8080/api/products/';
const info = {};
fetch(url)
    .then(response => { return response.json(); })
    .then(async data => {

        console.log("datos recibidos:", data);
        info = await data;
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
        console.log("Error en el fetch.")
    });

console.log(info.payload)




/*
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

*/