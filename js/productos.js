class Producto{
    constructor (urlImagen, tipoProducto, nombre, precio, stock, descripcion){  
    this.urlImagen = urlImagen;
    this.id = tipoProducto;
    this.item = nombre;
    this.precio = precio;
    this.stock = stock;
    this.descripcion = descripcion;
    this.disponible = true;
    this.vendido = false;
    }

    sumarIva(){
        console.log(`Precio: ${this.precio}`)
        this.precio = this.precio * 1.21;
        console.log(`Precio + Iva: ${this.precio}`);
        return this.precio;
    }
}

const mercaderia = [new Producto("tomate-carrito", "verdura", "tomate", 80, 5, " c/ 100grs 18 kcal"),
                    new Producto("lechuga-carrito", "verdura", "lechuga", 120, 3, "c/ 100grs 15 kcal"),
                    new Producto("zanahoria-carrito", "verdura", "zanahoria", 60, 1, "c/ 100g 41 kcal"),
                    new Producto("ajo-carrito", "verdura", "ajo", 150, 4, "c/ 100g 149 kcal"),
                    new Producto("morron-carrito", "verdura", "morron", 220, 2, "c/ 100g 35 kcal"),
                    new Producto("zapallo-carrito", "verdura", "zapallo", 70, 6, "c/ 100g 26 kcal"),
                    new Producto("papa-carrito", "verdura", "papa", 50, 3, "c/ 100g 77 kcal"),
                    new Producto("cebolla-carrito", "verdura", "cebolla", 55, 3, "c/ 100g 40 kcal" ),
                    new Producto("melon-carrito", "fruta", "melon", 120, 6, "c/ 100g 36 kcal"),
                    new Producto("limon-carrito", "fruta", "limon", 90, 6, "c/ 100g 29 kcal"),
                    new Producto("banana-carrito", "fruta", "banana", 200, 6, "c/ 100g	89 kcal"),
                    new Producto("manzana-carrito", "fruta", "manzana", 195, 6, "c/ 100g 52 kcal"),
                    new Producto("naranja-carrito", "fruta", "naranja", 70, 6, "c/ 100g	47 kcal"),
                    new Producto("pera-carrito", "fruta", "pera", 180, 6, "c/ 100g	57 kcal"),
                    new Producto("kiwi-carrito", "fruta", "kiwi", 380, 6, "c/ 100g 61 kcal"),
                    new Producto("mandarina-carrito", "fruta", "mandarina", 50, 6, "c/ 100g 53 kcal"),
                    new Producto("promo-4-carrito", "promo", "promo 1", 1500, 6, "Surtido vegetales"),
                    new Producto("promo-3-carrito", "promo", "promo 2", 2000, 6, "Surtido frutas"),
                    new Producto("promo-1-carrito", "promo", "promo 3", 3000, 6, "Mix Frutas y Verduras"),
                    new Producto("promo-2-carrito", "promo", "promo 4", 2600, 6, "Mix Frutas, Verduras y especias")
];