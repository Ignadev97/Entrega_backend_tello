    const fs = require('fs')

    let rutaArchivo = './archivos/archivo.json'
    
    class productManager {
        
        constructor() {
            this.productos = []
            this.path = rutaArchivo
        }

        addProduct = (title, descritpion,price,code,stock) =>{

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

            try {
                fs.writeFileSync(this.path, JSON.stringify(this.productos, null, 2));
                console.log(`el archivo se creó con éxito con el producto: ${title}`)
            }catch(err){
                console.log('ocurrió un error al escribir el archivo:', err.message)
            } 
        }

        getProductsById = async (id) => {
            if(!id) {
                console.log(`este id: ${id} no existe en la base de datos. Por favor verifique`)
                return
                
            }

            const lecturaArchivo = await fs.promises.readFile(this.path, {encoding:'utf-8'})
            let productos=JSON.parse(lecturaArchivo)

            const productoEncontrado = productos.find((producto) => producto.id === id)

            return productoEncontrado
            
        }   


        getProducts = async () => {
           try {
            let archivoLeido = await fs.promises.readFile(this.path, {encoding:'utf-8'})
            let productos=JSON.parse(archivoLeido)
            return(productos)
        }catch(err){console.log('ocurrio un error inesperado. Detalle:', err.message)}

        }

        updateProduct = async(id, actualizacion) =>{
            try {
                const archivoLeido = await fs.promises.readFile(this.path, {encoding:'utf-8'})
                let productos=JSON.parse(archivoLeido)

                const indiceProducto = productos.findIndex((producto) => producto.id === id)

            if (indiceProducto !== -1) {
                productos[indiceProducto] = { ...productos[indiceProducto], ...actualizacion }
                await fs.promises.writeFile(this.path, JSON.stringify(productos,null,2))
                console.log(`el producto con id:${id} se actualizó exitosamente `)
                return productos[indiceProducto]
            }else{
                console.log(`no se encontró un producto con id:${id}`)
                return null
            }
            }
            catch (err){console.log('ocurrió un error inesperado. Detalle :', err.message)}

        }


        deleteProduct = async (id) => {
            try {
                const archivoLeido = await fs.promises.readFile(this.path, {encoding:'utf-8'})
                let productos=JSON.parse(archivoLeido)

                let indiceProductoAEliminar = productos.findIndex((producto) => producto.id === id) 

                if(indiceProductoAEliminar !== -1){
                    productos.splice(indiceProductoAEliminar, 1)      
                    console.log(`el objeto con id:${id} se eliminó exitosamente`) 
                    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2));  
                    const archivoLeido = await fs.promises.readFile(this.path, {encoding:'utf-8'})
                    return JSON.parse(archivoLeido)
                }else{
                    console.log(`no se encontró un producto con el id:${id}`)
                }
                
                

            }catch(err){
                console.log('ocurrió un error inesperado. Detalle:', err.message)
            }
        }

    }

    let creador= new productManager()
    //añadiendo productos
    // creador.addProduct('leche', 'leche de tambo original', 1500, 123, '80 unidades')
    creador.addProduct('azúcar', 'azúcar de los ingenios Tucumanos', 800, 345 , '30 unidades')
    creador.addProduct('arvejas', 'arvejas de la mejor selección', 600, 678, '130 unidades')
    creador.addProduct('leche de almendras', 'leche de almendras seleccionadas', 700, 567, '500 unidades')

    // //prueba getProducts()
    // creador.getProducts().then(productos => {
    //     console.log('prueba getProducts', productos);
    // });

    // //pureba getProductsById()
    // creador.getProductsById(2).then(res => console.log('prueba getProductsById', res))

    // //prueba updateProduct()
    // creador.updateProduct(2, {price:750, stock:'300 unidades'}).then(res => console.log('prueba updateProduct', res))
    
    //prueba deleteProduct()
    creador.deleteProduct(2).then((res) => console.log('pueba de deleteProduct', res))

   