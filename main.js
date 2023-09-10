
const contenedor = document.getElementById("contenedor");
const modalContainer = document.getElementById("modal-container");
const verCarrito = document.getElementById("cart");
const mostrarCarrito = document.getElementById("mostrar-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let modalAbierto= false;

const pedirProductos = async () => {
try {
    const response = await fetch("./data.json");
    const data = await response.json();

    localStorage.setItem("productos", JSON.stringify(data));

    data.forEach((libro) => {
        const div = document.createElement("div");
        div.className = "col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex flex-column flex-wrap justify-content-center align-items-center div-card";
        div.innerHTML = `
        <img class="img-libro" src="${libro.imagen}" alt="${libro.nombre}" />
        <h3 class="titulo-libro">${libro.nombre}</h3>
        <p>Autor: ${libro.autor}</p>
        <span>$${libro.precio}</span>
    `;
    contenedor.append(div);

    let boton= document.createElement("button");
    boton.innerText= "Comprar";
    boton.className= "boton";
    div.append(boton);
    
    boton.addEventListener("click", () =>{
        carrito.push({
            imagen: libro.imagen,
            id:libro.id,
            nombre: libro.nombre,
            precio: libro.precio,
        });
        console.log(carrito) 
        carritoStorage();
        
        Toastify({
            text: "Producto agregado a tu carrito ✔",
            duration: 3000,
            position: "right",
            gravity: "bottom", 
            style: {
            background: "#FF971D",
            },
        }).showToast();

    });
    });
    } catch (error) {
    console.log(error);
    }
};
pedirProductos();

verCarrito.addEventListener("click", () => {
    if (modalAbierto) {
    cerrarModal();
    } else {
    abrirModal();
    }
});

function abrirModal() {
    modalAbierto = true;
    actualizarCarrito();
    mostrarCarrito.style.display = "block";
}

function cerrarModal() {
    modalAbierto = false;
    mostrarCarrito.style.display = "none";
}

function actualizarCarrito() {
    modalContainer.innerHTML = "";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modalHeader";
    modalHeader.innerHTML = `
    <h5 class="modalHeader-title">Añade productos a tu carrito:</h5>
    `;
    modalContainer.append(modalHeader);

    carrito.forEach((libro) => {
    let div = document.createElement("div");
    div.className ="div-carrito"
    div.innerHTML = `
    <img class="img-carrito" src="${libro.imagen}" alt="${libro.nombre}"/>
    <h5>${libro.nombre}</h5>
    <h5>$${libro.precio}</h5>
    `;
    
    const eliminar =document.createElement("button");
    eliminar.innerHTML = "Eliminar";
    eliminar.className ="boton";
    div.append(eliminar);

    eliminar.addEventListener("click", () =>{
        eliminarLibro(libro.id);

        Toastify({
            text: "Producto eliminado de tu carrito",
            duration: 3000,
            position: "right",
            gravity: "bottom", 
            style: {
            background: "rgba(255, 59, 59, 0.8)",
            },
        }).showToast();

    });

    modalContainer.append(div);
    });

    const total= carrito.reduce((acum, item) => acum + item.precio, 0);

    const totalCompra= document.createElement("h5");
    totalCompra.innerHTML =`Total carrito: $${total}`;
    totalCompra.className ="total"
    modalContainer.append(totalCompra);

};

const eliminarLibro = (id) =>{
    carrito = carrito.filter((libro) => libro.id !== id);
    console.log(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
};

const carritoStorage = () =>{
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

window.addEventListener("load", () => {
    cerrarModal();
});

actualizarCarrito();



