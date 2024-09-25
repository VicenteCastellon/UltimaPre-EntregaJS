// Productos 
const productos = [
    { id: 1, nombre: "Producto 1", precio: 100, imagen: "https://via.placeholder.com/300x200" },
    { id: 2, nombre: "Producto 2", precio: 200, imagen: "https://via.placeholder.com/300x200" },
    { id: 3, nombre: "Producto 3", precio: 150, imagen: "https://via.placeholder.com/300x200" },
];

// Carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || []; 

// Elementos del DOM
const productsContainer = document.getElementById('products');
const cartItemsContainer = document.getElementById('cart-items');
const totalContainer = document.getElementById('total');

// Mostrar productos
function mostrarProductos() {
    productsContainer.innerHTML = ''; 
    productos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-md-4', 'mb-3'); 
        productCard.innerHTML = `
            <div class="card h-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard); 
    });
}

// Agregar al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    carrito.push(producto);
    actualizarCarrito();
    guardarCarrito(); e
}

// Eliminar una instancia del carrito
function eliminarUnaInstanciaDelCarrito(idProducto) {
    const index = carrito.findIndex(producto => producto.id === idProducto); 
    if (index !== -1) {
        carrito.splice(index, 1); 
        actualizarCarrito();
        guardarCarrito(); 
    }
}

// Actualizar carrito
function actualizarCarrito() {
    cartItemsContainer.innerHTML = '';
    let total = 0;


    const carritoAgrupado = carrito.reduce((acc, producto) => {
        const existe = acc.find(item => item.id === producto.id);
        if (existe) {
            existe.cantidad++;
        } else {
            acc.push({ ...producto, cantidad: 1 });
        }
        return acc;
    }, []);

    carritoAgrupado.forEach(producto => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        cartItem.innerHTML = `
            ${producto.nombre} - $${producto.precio} (x${producto.cantidad})
            <button class="btn btn-danger btn-sm" onclick="eliminarUnaInstanciaDelCarrito(${producto.id})">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += producto.precio * producto.cantidad;
    });

    totalContainer.innerText = total;
}

// Guardar el carrito en Local Storage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Inicializar
function inicializar() {
    mostrarProductos();
    actualizarCarrito(); 
}

// Ejecutar inicialización al cargar la página
inicializar();













