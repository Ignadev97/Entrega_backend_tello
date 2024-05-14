import express from 'express'
const router = express.Router()
import cartController from '../controller/carritos.controller'

// const handlerCart = new cartManager()

// router.post('/', async (req,res) => {
//     try{
//         handlerCart.addCart()
//         res.status(201).json({ message: 'Carrito creado con éxito' });
//     }catch(err){
//         res.status(500).send('Se produjo un error interno del servidor al intentar crear el carrito.');
//     }
// })

// router.get('/:cid', async (req,res) => {
//   try{
//     const {cid} = req.params

//     const cart = await handlerCart.getCartProductsById(parseInt(cid))

//     res.status(200).send(cart)

//   }catch(err){
//     res.status(400).send('Solicitud no válida. ID incorrecto');
// }
    
// })

// router.post('/:cid/product/:pid', async (req,res) => {
//     try {
//         const {cid,pid} = req.params

//         let cartId = parseInt(cid)
//         let productId = parseInt(pid)


//         const carritoConProducto = await handlerCart.addProductToCart(cartId,productId)

//         console.log(carritoConProducto)
    
//     } catch (err) {
        
//     }
// })

export default router 