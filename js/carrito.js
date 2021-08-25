class Producto{
    constructor (urlImagen, tipoProducto, nombre, precio, stock){   /* crea objetos producto para lista mercaderia*/
    this.urlImagen = urlImagen;
    this.id = tipoProducto;
    this.item = nombre;
    this.precio = precio;
    this.stock = stock;
    this.disponible = true;
    this.vendido = false;
    }
    /* metodos de objeto*/
    sumarIva(){
        console.log(`Precio: ${this.precio}`)
        this.precio = this.precio * 1.21;
        console.log(`Precio + Iva: ${this.precio}`);
    }
    SeVendio(){
        this.vendido = true;
        console.log(`Producto Vendido ${this.vender}`);
    }
    comprar(a){
        console.log(`Stock previo a la compra ${this.stock}`)
        if(this.stock>=1 && (a <= this.stock)){
            this.stock -= a;
            console.log(`Unidades restantes ${this.stock}`);
        }else{
            this.disponible = false;
            console.log(`¡Producto no disponible!`);
            alert(`Producto agotado`);
        }
    }
    pagado(){
        this.pagado = true;
        console.log(`El producto esta pago ${this.pagado}`)
    }
    printCompra(){
        console.log(`Compró ${this.item} por $${this.precio}`);
    }
}
/* array productos carrito*/
const mercaderia = [
                    new Producto("tomate-carrito", "verdura", "tomate", 80, 5),
                    new Producto("lechuga-carrito", "verdura", "lechuga", 120, 3),
                    new Producto("zanahoria-carrito", "verdura", "zanahoria", 60, 1),
                    new Producto("ajo-carrito", "verdura", "ajo", 150, 4),
                    new Producto("morron-carrito", "verdura", "morron", 220, 2),
                    new Producto("zapallo-carrito", "verdura", "zapallo", 70, 6),
                    new Producto("papa-carrito", "verdura", "papa", 50, 3),
                    new Producto("cebolla-carrito", "verdura", "cebolla", 55, 3),
                    /*frutas*/
                    new Producto("melon-carrito", "fruta", "melon", 120, 6),
                    new Producto("limon-carrito", "fruta", "limon", 90, 6),
                    new Producto("banana-carrito", "fruta", "banana", 200, 6),
                    new Producto("manzana-carrito", "fruta", "manzana", 195, 6),
                    new Producto("naranja-carrito", "fruta", "naranja", 70, 6),
                    new Producto("pera-carrito", "fruta", "pera", 180, 6),
                    new Producto("kiwi-carrito", "fruta", "kiwi", 380, 6),
                    new Producto("mandarina-carrito", "fruta", "mandarina", 50, 6),
]

/* variables y array de totales*/
console.log(mercaderia)
const carrito = [];
let totalPrecio = 0;
let totalPrecioIva = 0;

/* funciones carrito*/
function listaToLocStorage(){
    localStorage.setItem("productos", JSON.stringify(mercaderia)); /*almacena el array de productos en el localStorage*/
}
function crearCards(tipoProducto, productID){
    const traerLista =JSON.parse(localStorage.getItem("productos")); /* recupera el array de LSstorage*/
    const filtrarproducto = traerLista.filter(categoriaProducto => categoriaProducto.id == tipoProducto); /* filtra el array de productos por id*/
    const lista = []; /* array de productos filtrados por id */
    for(const producto of filtrarproducto){
        lista.push(new Producto(producto.urlImagen, producto.id, producto.item, parseFloat(producto.precio), parseInt(producto.stock))); /* adhiere metodos de class productos*/
    }
    console.log(lista);
    const fragment = document.createDocumentFragment(); /*guarda las estructuras generadas para las cards evitar reflow del bucle for*/
    for(const producto of lista){ /* por cada item de la lista genera la estructura de la card */
        let item = document.createElement("div");
        item.classList.add(`item`, `mb-5`, `col-sm-12`, `col-md-6`, `col-lg-3`);
        let cardbody = document.createElement("div"); /* crea body*/
        cardbody.classList.add("cardBody", "rounded");
        let img = document.createElement("img"); /* crea la imagen y asigna segun producto*/
        img.src = `media/${producto.id}/${producto.urlImagen}.jpg`;
        img.classList.add("w-100");
        let description = document.createElement("div"); /*crea contenedor para boton, nombre y precio*/
        description.classList.add("description", "d-flex", "align-items-center", "justify-content-around", "px-2");
        let boton = document.createElement("i"); /* crea boton de add carrito*/
        boton.classList.add("bx", "bx-fw", "bx-tada-hover", "bx-md", "bxs-cart-add");
        let texto = document.createElement("p");
        texto.classList.add("m-0", "text-center"); /* crea texto card */
        texto.innerText = `${producto.item} \n $${producto.precio} x kg`;
        /* se asignan los hijos a cada elemento y arma la estructura*/
        item.appendChild(cardbody)
        cardbody.appendChild(img);
        cardbody.appendChild(description);  
        description.appendChild(boton);
        description.appendChild(texto);
        fragment.appendChild(item) /* envia la estructura a la variable fragment*/
    }
    const contenedor = document.getElementById(productID); /* selecciona etiqueta html y se carga el fragment con las estructuras de las cards*/
    contenedor.appendChild(fragment) 
}

function mostrarListaProductos(){
    let traerlista = JSON.parse(localStorage.getItem("productos")); /* trae el array de objetos del localStorage*/
    let mostrarLista = ""; /* guarda las propiedades producto y precio de los objetos del array*/
    for(let i = 0; i< traerlista.length; i++){
        mostrarLista += `${traerlista[i].item} $${traerlista[i].precio}\n`; /* recorre el array y carga las propiedades a la variable mostrarLista*/ 
    }
    alert(`LISTA DE PRODUCTOS x Kg:\n ${mostrarLista}`); 
}
function elegirProducto(){
    let deseaSeguir = "si";
    const traerlista = JSON.parse(localStorage.getItem("productos")); /*tre lista del localStorage*/
    const listaProductos = [] /* almacena lista de productos con metodos adheridos a través de ciclo for y push*/
    for(productos of traerlista){
        listaProductos.push(new Producto(productos.id, productos.item, parseFloat(productos.precio), parseInt(productos.stock)));
    }
    do{
        let selectItem = prompt("Ingresa el producto seleccionado"); /*ingresa el producto elegido*/
        let itemIngresado = selectItem.toLowerCase();/* pasa a minusculas la entrada*/
        let productoElegido = listaProductos.find(productName => productName.item === itemIngresado); /*busca el producto en la lista*/
        sessionStorage.setItem("Producto seleccionado:", JSON.stringify(productoElegido)); /*guarda los objetos seleccionados en sessionStorage*/ 
        if(selectItem == ""){
            alert("Ingrese un producto al carrito"); /* muestra error de campo vacio*/
            continue;
        }else if(productoElegido === undefined){
            alert("¡Producto elegido no disponible!"); /*muestra error de entrada icorrecta*/
            continue;
        }
        alert(`cantidad de producto disponible ${productoElegido.stock}kg`); /* muestra disponibilidad del producto al usuario*/
        let cantidadItem = parseInt(prompt(`ingrese la cantidad de producto\n(compra minima 1Kg): `));
        if(cantidadItem == isNaN && (cantidadItem == 0)){/*muestra error de entrada icorrecta y pide nueva entrada*/
            alert(`Vuelva a ingresar la cantidad de producto (kg):`);
            let cantidadItem = parseInt(prompt(`ingrese la cantidad de producto\n(compra minima 1Kg): `));
        }else{
            productoElegido.comprar(cantidadItem); /* descuenta stock */
            if(productoElegido.disponible == false){ /* chequea el stock del producto y avisa si no hay stock no hace la compra*/
                deseaSeguir = prompt(`¿Desea agregar mas productos al carrito?`) /* continuar o finalizar compra*/
                continue;
            }
            console.log(`Precio por kg ${productoElegido.item}: $${productoElegido.precio}`)/* registrto compra de item y precio sin iva*/
            productoElegido.precio *= cantidadItem; /* multiplica el precio por la cantidad de producto pedido y cambia la propiedad precio del objeto*/
            carrito.push(productoElegido); /*guarda el prducto actualizado en la lista*/
            alert(`Se agregó ${productoElegido.item} al carrito`); /* confirmacion de carga al carrito usuario*/
            console.log(`Se agregó ${productoElegido.item} al carrito`);/* confirmacion de carga al carrito consola*/
            productoElegido.printCompra(); /* detalle de compra en consola*/
            console.log(productoElegido);/* detalle del producto comprado en consola*/
            deseaSeguir = prompt(`¿Desea agregar mas productos al carrito?`) /* continuar o finalizar compra*/
        }
    }while(deseaSeguir != "no");
}

function sumarTotal(){
    for(let i=0; i< carrito.length; i++){ /*recorre el carrito y suma los precios a la variable totalPrecio*/
        totalPrecio += carrito[i].precio;
    }

}
function totalIva(){
    for(let precio of carrito) /* aplica metodo sumarIva a cada elemento del carrito*/
    precio.sumarIva();
    for(let i=0; i< carrito.length; i++){ /* recorre el carrito y suma todos los precios con iva incluido*/
        totalPrecioIva += carrito[i].precio;
    }
}
listaToLocStorage();
crearCards("verdura", "verdura");
crearCards("fruta", "fruta")
// mostrarListaProductos();
// elegirProducto();
// sumarTotal();
// totalIva();
// console.log(`El total de su compra es: ${totalPrecio}`) /* registro de compra en consola*/
// console.log(`El total de su compra + Iva es ${totalPrecioIva}`)
// alert(`El total de su compra es: ${totalPrecio}`); /*alert totales fin de compra*/
// alert(`El total de su compra + Iva es ${totalPrecioIva}`);



