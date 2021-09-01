const carrito = [];
let contador = 0;
/* agrega los productos al carrito DOM y al array carrito*/
function addCarrito(e){
    alert("Producto agregado al carrito")
    contador++
    const lista = traerListaLs();
    const itemElegido = e.target.parentNode;
    for(producto of lista){
        if(itemElegido.querySelector(".prodName").innerText.toLowerCase() === producto.item){
            itemCarrito = {
                    cantidad: 1,
                    item: producto.item,
                    precio: producto.precio,
            };
            let carritoHtml = document.getElementById("carrito");
            let tr = document.createElement("tr")
            tr.innerHTML = `<td>${itemCarrito.cantidad}</td>
                            <td>${itemCarrito.item}</td>
                            <td>$${itemCarrito.precio * itemCarrito.cantidad}</td>`;
            carritoHtml.appendChild(tr);
            carrito.push(itemCarrito); 
            let iconSum = document.getElementById("quantity");
            iconSum.innerText = contador;
            iconSum.classList.add("count");
        } 
    }
    console.log(carrito)
    total();
    totalIva();
    vaciarCarrito()
    confirmCarrito()
}

/* calculo del total del carrito*/
function total(){
    let precioTotal = 0;
    for(let i = 0; i< carrito.length; i++){
        precioTotal += carrito[i].precio;
    }
    let totalHtml = document.getElementById("total");
    totalHtml.innerText = `Total: $ ${precioTotal}`;
    console.log(precioTotal);
}

/*claculo del total del carrito + iva*/
function totalIva(){
    let precioTotalIva = 0;
    for(let i = 0; i< carrito.length; i++){
        precioTotalIva += carrito[i].precio * 1.21;
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




