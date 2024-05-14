import mongoose from "mongoose";
import { cartMongoDAO } from "../dao/cartMongoDAO.js";

const cartDAO = new cartMongoDAO()

export default class cartController {
    //formato a pasar {"carrito":{"products":[]}}
    static addCart = async (req,res) => {
        try {
    
            const {carrito} = req.body
    
            const carritoCreado = cartDAO.addCart(carrito)
    
            res.status(200).json({mensaje: `el carrito fue creado con éxito`, carritoCreado})
        } catch (err) {
            res.status(500).json({error: `no se pudo crear el carrito`, detalle: err.message})
        }
    }
    
    static addProductsToCart = async (req,res) => {
        try {
        let {cid} = req.params    
        let {products} = req.body
    
        if (!products) {
           return res.status(400).json({message: "el formato del producto no es el correcto, por favor verifique."})
        }
    
        let productosAgregados = await cartDAO.addProductsToCart(cid, products)
    
        res.status(200).json({message: 'se agregaron los productos con éxito', productosAgregados})
        } catch (err) {
            res.status(500).json({ error: `no se pudo crear el carrito correctamente. ingrese los datos de un producto.`, detalle: err.message });
        }    
     
    }

    static getCartById = async (req, res) => {
        try {
            const {id} = req.params
            let carrito = await cartDAO.getCartProductsById(id)
            console.log(JSON.stringify(carrito, null, 5))
            res.status(200).json({carrito})
        } catch (err) {
            res.status(500).json({ error: `no se pudo leer un carrito con el id: ${id}`, detalle: err.message });
        }
    }

    static deleteProductFromCart = async (req, res) => {
        try {
            const {cid, pid} = req.params
    
            let carrito = await cartDAO.getCartProductsById(cid)
    
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
    }

    static updateQuantity = async (req, res) => {
        try {
            const {cid, pid} = req.params
            const {quantity} = req.body
            console.log(quantity)
            if(!Number.isInteger(quantity) || quantity <= 0 ) {
                return res.status(400).json({message:"la propiedad quantity que se está pasando debe ser un número entero!"})
    
            }
    
            const carrito = await cartDAO.getCartProductsById(cid)
    
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
    }

    static deleteCart = async (req, res) => {
        try {
            const {cid} = req.params
    
            let carrito = await cartDAO.getCartProductsById(cid)
    
            if (!carrito) {
                return res.status(400).json({error:"el carrito no ha sido encontrado"})
            }
    
            carrito.products.splice(0, carrito.products.length)
    
            await carrito.save()
    
            res.status(200).json({message: "producto eliminado con éxito", carrito})
    
        } catch (err) {
            res.status(500).json({ error: 'Error del servidor',detalle : err.message});
        }
    }



}