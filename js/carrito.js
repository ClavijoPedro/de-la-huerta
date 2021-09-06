const carrito = [];
let contador = 0;
/* agrega los productos al carrito DOM y al array carrito*/
function addCarrito(e){
    // alert("Producto agregado al carrito")
    /*traigo lista del local Storage*/
    const lista = traerListaLs();

    /*capturo el item elegido en el dom*/
    const itemElegidoDom = e.target.parentNode;

    /* busco el item en la lista que traje del local Storage*/
    const itemLista = lista.find(producto => producto.item === itemElegidoDom.querySelector(".prodName").innerText.toLowerCase());
    console.log(itemLista.item);

    /*le agrego la propiedad cantidad al producto de lista*/
    itemLista.cantidad = 1;

    /*busco el item en el carrito*/
    const buscarCarrito = carrito.find(producto => producto.item === itemLista.item);

    /*si el carrito esta vacio  o no esta el itemElegidoDom "undefinded" hace push del itemLista al carrito,
     sino busca el item en el carrito y aumenta su cantidad*/
    if(buscarCarrito == undefined){
        carrito.push(itemLista);
        contador++;
    }else{
        for(let i = 0; i<carrito.length; i++){
            if(carrito[i].item == itemLista.item){
                carrito[i].cantidad++ ;
            }
        }  
    }

    /*le sumo la cantidad de productos al icono carrito en el headesr del DOM*/
    let iconSum = document.getElementById("quantity");
    iconSum.innerText = contador;
    iconSum.classList.add("count");
    printCarrito(); 
}
  
/*imprimo el carrito en el DOM y muestro totales*/
function printCarrito(){
    let carritoHtml = document.getElementById("carrito");
    carritoHtml.innerHTML = "";
    for(let i = 0; i< carrito.length; i++){
        let tr = document.createElement("tr")
        tr.innerHTML = `<td>${carrito[i].cantidad}</td>
        <td>${carrito[i].item}</td>
        <td>$${carrito[i].precio * carrito[i].cantidad}</td>`;
        carritoHtml.appendChild(tr);
    }
    total();
    totalIva();
    vaciarCarrito()
    confirmCarrito()
}

/* calculo del total del carrito*/
function total(){
    let precioTotal = 0;
    for(let i = 0; i< carrito.length; i++){
        precioTotal += carrito[i].precio * carrito[i].cantidad;
    }
    let totalHtml = document.getElementById("total");
    totalHtml.innerText = `Total: $ ${precioTotal}`;
    console.log(precioTotal);
}

/*claculo del total del carrito + iva*/
function totalIva(){
    let precioTotalIva = 0;
    for(let i = 0; i< carrito.length; i++){
        precioTotalIva += carrito[i].precio * carrito[i].cantidad * 1.21;
    }
    let totalHtml = document.getElementById("totalIva");
    totalHtml.innerText = `Total Iva: $ ${precioTotalIva.toFixed()}`;
    console.log(precioTotalIva);
}

/*limpia carrito HTML y carrito array */
function vaciarCarrito(){
    let btnLimpiar = document.getElementById("btnLimpiar");
    btnLimpiar.addEventListener("click", () => {
        let vaciarCarrito = document.getElementById("carrito");
        vaciarCarrito.innerHTML = "";
        carrito.length = 0;
        let removeConfirm = document.getElementById("carritoCheck");
        removeConfirm.innerHTML = ""; 
        let removeIco = document.getElementById("quantity");
        removeIco.classList.remove("count")
        removeIco.innerText = "";
        contador = 0;
        total();
        totalIva();
    })
}

/* confirma la compra del carrito*/
function confirmCarrito(){
    let btnConfirmar = document.getElementById("confirm");
    let body = document.getElementById("carrito");
    btnConfirmar.addEventListener("click", () => {
        if(!body.innerHTML == ""){
            console.log("aprete confirm");
            const msjConfirm = document.getElementById("carritoCheck");
            msjConfirm.innerHTML = `<p class="text-center py-4 px-0 bg-greenlight mb-0">Compra Realizada <i class='bx bx-sm bx-fw bx-check-circle' style='color:#009e07'></i></p>`;
        }
    })
}