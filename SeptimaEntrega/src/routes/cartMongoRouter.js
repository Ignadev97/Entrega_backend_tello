import express from 'express'
import mongoose from 'mongoose'
import { cartMongoManager } from '../dao/managers/cartMongoManager.js'
import { productMongoManager } from '../dao/managers/productMongoManager.js'

const router = express.Router() 

const cartManager = new cartMongoManager()
const productManager = new productMongoManager()

//Obtener carrito con el id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        let carrito = await cartManager.getCartProductsById(id)
        console.log(JSON.stringify(carrito, null, 5))
        res.status(200).json({carrito})
    } catch (err) {
        res.status(500).json({ error: `no se pudo leer un carrito con el id: ${id}`, detalle: err.message });
    }
})


//endpoint para eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const {cid, pid} = req.params

        let carrito = await cartManager.getCartProductsById(cid)

        if (!carrito) {
            return res.status(400).json({error:"el carrito no ha sido encontrado"})
        }

        const productId = new mongoose.Types.ObjectId(pid)

        const productIndex = carrito.products.findIndex(product => product._id.equals(productId))

        if(productIndex === -1){
            return res.status(400).json({error: "el producto no se encuentra en el carrito", carrito})
        }

        carrito.products.splice(productIndex, 1)

        await carrito.save()

        res.status(200).json({message: "producto eliminado con éxito", carrito})

    } catch (err) {
        res.status(500).json({ error: 'Error del servidor',detalle : err.message});
    }
})

//actualizar el carrito con un array de products con el formato de arriba
// NO ME QUEDÓ CLARO QUE ME PIDE LA CONSIGNA EN ESTE ENDPOINT
// router.put('/:id', (req, res) => {
//     try {
        
//     } catch (err) {
        
//     }
// })



//endpoint que actualiza la prop quantity solamente del producto selecionado
router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const {cid, pid} = req.params
        const {quantity} = req.body
        console.log(quantity)
        if(!Number.isInteger(quantity) || quantity <= 0 ) {
            return res.status(400).json({message:"la propiedad quantity que se está pasando debe ser un número entero!"})

        }

        const carrito = await cartManager.getCartProductsById(cid)

        if(!carrito) {
            res.status(400),json({message:' el id del carrito es incorrecto o no existe'})
        }

        const productId = new mongoose.Types.ObjectId(pid)

        
        const productIndex = carrito.products.findIndex(item => item.product._id.equals(productId))

       
        carrito.products[productIndex].product.quantity = quantity;

        console.log(carrito.products[productIndex].product.quantity)

        await carrito.save()

        res.status(200).json({message: `Se actualizó correctamente la propiedad quantity del producto con id ${pid}`, carrito})

    } catch (err) {
        res.status(500).json({ error: 'Error del servidor',detalle : err.message});
    }
})

//endpoint para eliminar TODOS los productos del carrito
router.delete('/:cid', async (req, res) => {
    try {
        const {cid} = req.params

        let carrito = await cartManager.getCartProductsById(cid)

        if (!carrito) {
            return res.status(400).json({error:"el carrito no ha sido encontrado"})
        }

        carrito.products.splice(0, carrito.products.length)

        await carrito.save()

        res.status(200).json({message: "producto eliminado con éxito", carrito})

    } catch (err) {
        res.status(500).json({ error: 'Error del servidor',detalle : err.message});
    }
})



//mandar un producto para que CREE un cart nuevo y SE LE AGREGUE EL PRODUCTO ENVIADO POR BODY 

// actualización. El Endpoint no crea carrito, solo se trabaja por uno por ahora. 

// formato a pasar: {"products":[{"product": "id del producto ya ingresado en db.products"}]}

router.post('/', async (req,res) => {
    try {
    let {products} = req.body
    const idCarritoHardcodeado = '660a2df660de54887af3a385'    //id de un solo carrito para trabajar solo sobre él por ahora
    const productos = products
     
    if (!productos) {
       return res.status(400).json({message: "el formato del producto no es el correcto, por favor verifique."})
    }

    let productosAgregados = await cartManager.addProductsToCart(idCarritoHardcodeado,productos)


    res.status(200).json({message: 'se agregaron los productos con éxito', productosAgregados})
    } catch (err) {
        res.status(500).json({ error: `no se pudo crear el carrito correctamente. ingrese los datos de un producto.`, detalle: err.message });
    }    
 
})


//endpoint para agregar un pproducto a un carrito existente formato 
// router.post('/', (req, res) => {
//     let {products} = req.body 
// })

export default router




