const carrito = [];
let contador = 0;

/* agregar los productos al carrito DOM y al array carrito*/
function addCarrito(e){
    /*traigo lista del local Storage*/
    const lista = traerListaLs();
    /*capturo el nombre del item elegido en el dom*/
    const itemElegidoDom = e.target.parentNode.children[1].children[0];
    /* busco el item en la lista que traje del local Storage*/
    const itemLista = lista.find(producto => producto.item === $(itemElegidoDom).text());
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
            if(carrito[i].item === itemLista.item){
                carrito[i].cantidad++ ;
            }
        }  
    }
    printCarrito(); 
    iconSumCantidad()
}
  
/*imprimo el carrito en el DOM y muestro totales*/
function printCarrito(){
    /*borro el carritoDom para repintarlo actualizado cada vez que agrego un item */
    $("#carrito").html("");
    /*creo la fila del carritoDom para cada producto del array carrito*/
    console.log("este es el carrito" + $("#carrito").html());
    for(let i = 0; i< carrito.length; i++){
        $("#carrito").append(` <tr>
                                    <td>${carrito[i].cantidad}</td>
                                    <td class="itemName">${carrito[i].item}</td>
                                    <td>$${carrito[i].precio * carrito[i].cantidad}</td>
                                    <td><i class='removeItem bx bx-sm bx-border bx-x my-1' style='color:#9a0202'></i></td>
                                </tr>`);
    }
    total();
    totalIva();
    vaciarCarrito()
    confirmCarrito()
    borrarItem() 
}

/* calculo del total del carrito*/
function total(){
    let precioTotal = 0;
    for(let i = 0; i< carrito.length; i++){
        precioTotal += carrito[i].precio * carrito[i].cantidad;
    }
    $("#total").text(`Total: $ ${precioTotal}`);
    console.log(precioTotal);
}

/*claculo del total del carrito + iva*/
function totalIva(){
    let precioTotalIva = 0;
    for(let i = 0; i< carrito.length; i++){
        precioTotalIva += carrito[i].precio * carrito[i].cantidad * 1.21;
    }
    $("#totalIva").text(`Total Iva: $ ${precioTotalIva.toFixed()}`);
    console.log(precioTotalIva);
}

/*limpia carritoDom y carrito array */
function vaciarCarrito(){
    $("#btnLimpiar").click(function () {
        $("#carrito").html("");
        carrito.length = 0;
        $("#carritoCheck").html(""); 
        $("#quantity").removeClass("count");
        $("#quantity").text("");
        contador = 0;
        total();
        totalIva();
    });
}

/*borrar items del carritoDom*/
function borrarItem(){
    /*capturo botones eliminar del carrito*/
    const btnEliminar = $(".removeItem");

    /*agrego el evento a los botones eliminar*/
    for(let i=0; i< $(btnEliminar).length; i++){
        $(btnEliminar[i]).click(function (e){
            
            /*capturo la fila del item a borrar*/
            const row = e.target.parentNode;

            /*borro la row del item*/
            $(btnEliminar[i]).parent().parent().remove();

            /*recorro el carrito y elimino el objeto que coincide con item eliminado del carrito Dom */
            ItemCartDom = carrito.find(producto => producto.item === row.parentNode.querySelector(".itemName").innerText);

            for(let i = 0; i< carrito.length; i++ ){
                if(carrito[i].item === ItemCartDom.item){
                borrarItemCart = carrito.splice(i, 1);
                }
            }
            contador--; 
            total();
            totalIva();
            iconSumCantidad()
        });
    }
}

/* confirma la compra del carrito*/
function confirmCarrito(){  
    $("#confirm").click( function (){
        if(carrito.length){
            $("#carritoCheck").html(`<p class="text-center py-4 px-0 bg-greenlight mb-0">Compra Realizada <i class='bx bx-sm bx-fw bx-check-circle' style='color:#009e07'></i></p>`);
        }
    });
}

/*muestra y elimina el el icono cantidad del carrito segun cantidad de items*/
function iconSumCantidad(){
    if(contador == 0){
        $("#quantity").text("");
        $("#quantity").removeClass("count");
    }else{
        $("#quantity").text(contador);
        $("#quantity").addClass("count");
    }
}