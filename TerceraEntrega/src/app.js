const express = require('express')
const clase = require('./ProductManager')

const productManager = new clase();



const PORT = 3000

const app = express()

app.get('/', (req, res) => {
 res.send('Home page')
})

app.get('/products', async (req, res) => {
    try{

        let productos = await productManager.getProducts()

        let {limit} = req.query

        if(limit && limit>0){
            productos = productos.slice(0,limit)
        }
        
        res.json(productos)


    }catch(err){
        console.log('se produjo un error. Detalle : ', err.message)
    }
   })

app.get('/products/:id', async (req, res) => {
   try {

    const id = req.params.id;

    if (!id) {
        console.log('El parámetro "id" es obligatorio')
        return
    }

    const producto = await productManager.getProductsById(parseInt(id))

    if (!producto){
        console.log('Producto no encontrado')
        return
    }

    res.json(producto)

   }catch(err){
        console.log('se produjo un error inesperado. detalle:', err.message)
   }
   
})

app.listen(PORT, () => {
    console.log(` app corriendo en puerto: ${PORT}`)
})