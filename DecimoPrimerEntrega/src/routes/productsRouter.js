import express from 'express'
const router = express.Router()
import productController from '../controller/productos.controller'

// router.get('/', async (req, res) => {
//        try{
//            let productos = await handlerProduct.getProducts()
   
//            let {limit} = req.query
   
//            if(limit && limit>0){
//                productos = productos.slice(0,limit)
//            }
           
//            res.status(200).send(productos)
   
   
//        }catch(err){
//         res.status(500).json({ error: err.message })
//        }
//       })

// router.get('/:id', async (req, res) => {
//       try {
   
//        const id = req.params.id;
   
//        if (!id) {
//            console.log('El parámetro "id" es obligatorio')
//            return
//        }
   
//        const producto = await handlerProduct.getProductsById(parseInt(id))
   
//        if (!producto){
//            console.log('Producto no encontrado')
//            return
//        }
   
//        res.status(200).send(producto)
   
//       }catch(err){
//         res.status(400).json({ error: err.message })
//       }
      
//    })
// router.post('/', async (req, res) => {
//     try {
//         const { title, description, price, code, stock } = req.body;

//         handlerProduct.addProduct( title, description, price, code, stock );

//         const productos = await handlerProduct.getProducts()

//         let productoExistente = productos.find(producto => producto.title === req.body.title)
        
//         if(productoExistente){
//             res.send('el producto ya se encuentra en la base de datos')
//             return
//         }

//         res.status(201).json({message: 'producto creado con éxito'})

//     }catch(err){
//         res.status(400).json({ error: err.message })
//     }
// })
// router.put('/:pid', async (req, res) => {
//     try{

//     const productId = parseInt(req.params.pid);

//     const { actualizacion } = req.body

//     const productoActualizado = await handlerProduct.updateProduct(productId,actualizacion)

//     if (!productoActualizado) {
//         res.status(404).json({error:'No se encontró un producto con el ID proporcionado'})
//         return
//     }

//     res.send(productoActualizado)
//     }catch(err){
//         res.status(500).json({ error: err.message })
//     }
//    })

// router.delete('/:pid', async (req, res) => {
//     const productId = parseInt(req.params.pid)

//     const productoEliminado = await handlerProduct.deleteProduct(productId)

//     if(!productoEliminado){
//         res.status(404).json({error:'No se encontró un producto con el ID proporcionado'})
//         return;
//     }

//     res.status(200).json({message: 'se eliminó el producto correctamente'})
// })
export default router   