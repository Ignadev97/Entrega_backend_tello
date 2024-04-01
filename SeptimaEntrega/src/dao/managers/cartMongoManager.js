import { modeloCarts } from "../models/models.js";
import { modeloProducts } from "../models/models.js";

export class cartMongoManager {
    addCart = async (products) => {
        try {
            const cart = {products}
            return await modeloCarts.create(cart)
        } catch (err) {
            console.log('error inesperado. Detalle:' , err.message)
        }
    }

    getCartProductsById = async (id) => {
        try {
            return await modeloCarts.findById(id).populate("products.product")
        } catch (err) {
            console.log('error inesperado. Detalle:' , err.message)
        }
    }
    
    addProductsToCart = async(idCart, products) =>{
        try {
            const carrito = await this.getCartProductsById(idCart)
            const productos = products

            carrito.products = productos

            return carrito
        } catch (err) {
            console.log('error inesperado. Detalle:' , err.message)
        }
    }

}
