
let contenedor = document.getElementById("contenedor");
const carritoCompras =document.getElementById("carritoCompras");


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const pedirProductos = async () => {
try {
    const response = await fetch("./data.json");
    const data = await response.json();

    // Guardo los datos en el Local Storage
    localStorage.setItem("libros", JSON.stringify(data));

    data.forEach((libro) => {
        const div = document.createElement("div");
        div.className = "col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex flex-column flex-wrap justify-content-center align-items-center div-card";
        div.innerHTML = `
        <img class="img-libro" src="${libro.imagen}" alt="${libro.nombre}" />
        <h3>${libro.nombre}</h3>
        <p>Autor: ${libro.autor}</p>
        <span>$${libro.precio}</span>
    `;
    contenedor.append(div);

    let boton= document.createElement("button");
    boton.innerText= "Comprar";
    boton.className= "boton";
    div.append(boton);
    // aca agregar el evento que agrega al carrito
    boton.addEventListener("click", () =>{
        carrito.push({
            id:libro.id,
            nombre: libro.nombre,
            precio: libro.precio,
        });
        console.log(carrito)
        actualizarCarrito();
        carritoStorage();
    });
    });
    } catch (error) {
    console.log(error);
    }
};

pedirProductos();