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
        return this.precio;
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
}
/* array productos carrito*/
const mercaderia = [new Producto("tomate-carrito", "verdura", "tomate", 80, 5),
                    new Producto("lechuga-carrito", "verdura", "lechuga", 120, 3),
                    new Producto("zanahoria-carrito", "verdura", "zanahoria", 60, 1),
                    new Producto("ajo-carrito", "verdura", "ajo", 150, 4),
                    new Producto("morron-carrito", "verdura", "morron", 220, 2),
                    new Producto("zapallo-carrito", "verdura", "zapallo", 70, 6),
                    new Producto("papa-carrito", "verdura", "papa", 50, 3),
                    new Producto("cebolla-carrito", "verdura", "cebolla", 55, 3),
                    new Producto("melon-carrito", "fruta", "melon", 120, 6),
                    new Producto("limon-carrito", "fruta", "limon", 90, 6),
                    new Producto("banana-carrito", "fruta", "banana", 200, 6),
                    new Producto("manzana-carrito", "fruta", "manzana", 195, 6),
                    new Producto("naranja-carrito", "fruta", "naranja", 70, 6),
                    new Producto("pera-carrito", "fruta", "pera", 180, 6),
                    new Producto("kiwi-carrito", "fruta", "kiwi", 380, 6),
                    new Producto("mandarina-carrito", "fruta", "mandarina", 50, 6)
];