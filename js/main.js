/*guarda lista productos en local Storage */
function listaToLocStorage(){
    localStorage.setItem("productos", JSON.stringify(mercaderia)); /*almacena el array de productos en el localStorage*/
}

/* devuelve la lista del Local Storage*/
function traerListaLs(){
    const listaLs = JSON.parse(localStorage.getItem("productos"));
    const lista = [];
    for(objetos of listaLs){
        lista.push(new Producto(objetos.urlImagen, objetos.id, objetos.item, parseFloat(objetos.precio), parseInt(objetos.stock)));
    }
   return lista; 
}

/*crea las cards de producto*/ 
function crearCards(tipoProducto, productID){
    /* fragment guarda las estructuras generadas para las  cards  evitar reflow del bucle for optimiza la carga de la pagina*/
    const fragment = document.createDocumentFragment();
    const lista = traerListaLs();
    
    /* filtra el array de productos por id*/
    const filtrarproducto = lista.filter(categoriaProducto => categoriaProducto.id == tipoProducto); 
    
    /* por cada item de la lista genera la estructura de la card */ 
    for(const producto of filtrarproducto){
        let item = document.createElement("div");
        item.classList.add(`item`, `mb-5`, `col-sm-12`, `col-md-6`, `col-lg-3`);
        
        let cardbody = document.createElement("div"); 
        cardbody.classList.add("cardBody", "rounded");
        
        let img = document.createElement("img"); 
        img.src = `media/${producto.id}/${producto.urlImagen}.jpg`;
        img.classList.add("w-100");
        
        let description = document.createElement("div");
        description.classList.add("description", "d-flex", "align-items-center", "justify-content-around", "px-2");
        
        let boton = document.createElement("i"); 
        boton.classList.add("bx", "bx-fw", "bx-tada-hover", "bx-md", "bxs-cart-add");
        boton.addEventListener("click", addCarrito)
        
        let texto = document.createElement("div")
        texto.classList.add(`text-center`, `py-3` );
       
        let titulo = document.createElement("p")
        titulo.innerText = `${producto.item}`;
        titulo.classList.add(`m-0`, `prodName`);
        
        let precio = document.createElement ("span");
        precio.innerText = `$${producto.precio}`;
        precio.classList.add(`m-0`);

        /* se agrega la estructura a los nodos html */
        item.appendChild(cardbody)
        cardbody.appendChild(img);
        cardbody.appendChild(description);  
        description.appendChild(boton);
        description.appendChild(texto);
        texto.appendChild(titulo);
        texto.appendChild(precio);
        /* envia la estructura a la variable fragment*/
        fragment.appendChild(item) 
    }
    /* selecciona etiqueta html y se carga el fragment con las estructuras de las cards*/
    const contenedor = document.getElementById(productID); 
    contenedor.appendChild(fragment)  
}

/* filtra los productos en pantalla por categoria*/ 
function filtrarCards(){
    let productosDom = document.getElementById("cardsProductos");
    let selector = document.getElementById("selector");
    selector.addEventListener("change", (e) => {
        console.log(e.target.value);
        if(e.target.value == "verTodo"){
            productosDom.innerHTML = "";
            crearCards("verdura", "cardsProductos");
            crearCards("fruta", "cardsProductos");
        }else if(e.target.value == "verduras"){
            productosDom.innerHTML = "";
            crearCards("verdura", "cardsProductos");
        }else if(e.target.value == "frutas"){
            productosDom.innerHTML = "";
            crearCards("fruta", "cardsProductos");
        }
    });
}
listaToLocStorage();
crearCards("verdura", "cardsProductos");
crearCards("fruta", "cardsProductos");
filtrarCards();
