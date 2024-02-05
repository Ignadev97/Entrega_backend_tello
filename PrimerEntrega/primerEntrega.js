class productManager {

    static cantidadProductos = 0

    constructor() {
        this.productos = []
    }

    addProduct(title, descritpion,price,code,stock){

        let existe = this.productos.find(product => product.title === title)

            if(existe) {
                console.log(`el producto ${title} ya está en la base de datos!`)
                return
            }

        let id = 1

        if(this.productos.length > 0){
            id = this.productos[this.productos.length-1].id +1
        }

        let nuevoProducto = {id, title, descritpion, price, code, stock}
        this.productos.push(nuevoProducto)
    }

    getProductsById(id) {
        if(!id) {
            console.log(`este id: ${id} no existe en la base de datos. Por favor verifique`)
            return
            
        }

        const productoEncontrado = this.productos.find(producto => producto.id === id)

        if(productoEncontrado) {
            return productoEncontrado
        }
    }   


    getProducts(){
        return this.productos
    }


}

let creador= new productManager()
creador.addProduct('leche', 'leche de tambo original', 1500, 123, '80 unidades')
creador.addProduct('azúcar', 'azúcar de los ingenios Tucumanos', 800, 345 , '30 unidades')
creador.addProduct('arvejas', 'arvejas de la mejor selección', 600, 678, '130 unidades')

console.log(creador.getProducts())
console.log(creador.getProductsById(3))
