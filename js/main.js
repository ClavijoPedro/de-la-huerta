
/*guarda lista productos en local Storage */
function listaToLocStorage(){
    localStorage.setItem("productos", JSON.stringify(mercaderia)); 
}
    
/* devuelve la lista del Local Storage*/
function traerListaLs(){
    const listaLs = JSON.parse(localStorage.getItem("productos"));
    const lista = [];
    for(objetos of listaLs){
        lista.push(new Producto(objetos.urlImagen, objetos.id, objetos.item, parseFloat(objetos.precio), parseInt(objetos.stock), objetos.descripcion));
    }
   return lista; 
}

/*crea las cards de producto*/ 
function crearCards(tipoProducto, productID){          /*elimine el fragment interferia en la carga de evento clcick*/
    /*traigo lista local Storage*/
    const lista = traerListaLs();
    /* filtra el array de productos por id*/
    const filtrarproducto = lista.filter(categoriaProducto => categoriaProducto.id == tipoProducto); 
    
    /* por cada item de la lista genera la estructura de la card y carga la estructura html al id del Dom*/ 
    for(const producto of $(filtrarproducto)){
        /* capturo el contenedor (id Dom) y cargo la estructura html de cada producto*/
        $(productID).append(`<div class=" item mb-5 col-10 col-md-6 col-lg-3">
                                <div class=" cardBody rounded">
                                    <div class="imagen">
                                        <img src="media/${producto.id}/${producto.urlImagen}.jpg" class="w-100">
                                        <div class="info">
                                            <span>${producto.descripcion}</span>
                                        </div>
                                        <div class="popCart">
                                            <span>+1</span>
                                        </div>
                                    </div>
                                    <div class="description d-flex align-items-center justify-content-around px-2">
                                        <i class="bx bx-fw addCart bx-tada-hover bx-md bxs-cart-add"></i>
                                        <div class="text-center py-3">
                                            <p class="m-0 prodName">${producto.item}</p>
                                            <span class="m-0">$${producto.precio}</span>
                                        </div> 
                                    </div>
                                </div>
                            </div>`);
    };
    $(".imagen").hover(function(){
        $(this).find(".info").fadeIn("slow");
        $(this).find("img").addClass("zoom");

    }, function(){
        $(".info").fadeOut();
        $(this).find("img").removeClass("zoom");
    });
}
function addItem(){
    $(".addCart").click(function(e){
        addCarrito(e);
        $(this.parentNode.parentNode).find(".popCart").show();
        $(this.parentNode.parentNode).find(".popCart").fadeOut(500);
    });
} 

/*  carga las cards al dom si esta vacio y filtra los productos en pantalla por categoria*/ 
function filtrarCards(){
    /*cargo cards si el Dom esta vacio y agrego evento a botones*/
    if($(carrito).length === 0){
        crearCards("verdura", "#cardsProductos");
        crearCards("fruta", "#cardsProductos");
        crearCards("promo", "#cardsPromos")
        addItem()
    }
    /*filtro con el select los productos y agrego evento a botones*/
    $("#selector").change(function (){
        if($("#selector").val() == "verTodo"){
            $("#cardsProductos").html("");
            crearCards("verdura", "#cardsProductos");
            crearCards("fruta", "#cardsProductos");
        }else if($("#selector").val() == "verduras"){
            $("#cardsProductos").html("");
            crearCards("verdura", "#cardsProductos");
        }else if($("#selector").val() == "frutas"){
            $("#cardsProductos").html("");
            crearCards("fruta", "#cardsProductos");
        }
        addItem() 
    });
}

/* Scroll suave de links*/ 
function smoothScroll(){
    $("#header .collapse ul a").click(e => {
    e.preventDefault();
    const href = $(e.target).attr("href");
    console.log($(e.target).attr("href"))
    $("html, body").animate({scrollTop: $(href).offset().top}, 800);
    });
}

/*valida campos form*/
function valForm(){
    $("#btnForm").click((e)=>{
        e.preventDefault()
        $("#news input").removeClass("valContent")
        if($("#usName").val() === ""){
            $("#usName").addClass("valContent");
        }else if($("#usMail").val() === ""){
            $("#usMail").addClass("valContent");
        }else if(($("#usMail").val().indexOf('@', 0) == -1) || ($("#usMail").val().indexOf('.', 0) == -1)){
            $("#usMail").addClass("valContent");
            $("#usMail").val("");
            $("#usMail").attr("placeholder", "Dirección inválida");
        }else{
            $("form").submit();
        }
    })
}

smoothScroll();
/* guardo lista en local Storage*/
listaToLocStorage();
/*imprimo cards si esta vaico el dom y activo filtro productos con select dom*/
filtrarCards();
/*valido form suscripcion*/
valForm();


    
    




