import { modeloCarts } from "../models/models.js";
import { modeloProducts } from "../models/models.js";

export class cartMongoManager {
    addCart = async (cart) => {
        try {
            return await modeloCarts.create(cart)
        } catch (err) {
            console.log('error inesperado. Detalle:' , err.message)
        }
    }

    getCartProductsById = async (id) => {
        try {
            return await modeloCarts.findById(id).lean()
        } catch (err) {
            console.log('error inesperado. Detalle:' , err.message)
        }
    }
    
    addProductToCart = async(idCart, idProduct) =>{
        try {
            const producto = await modeloCarts.findById(idProduct)
            const cart = await modeloCarts.findById(idCart)


            if (producto & cart) {
                return 
            } else {
                
            }
        } catch (err) {
            console.log('error inesperado. Detalle:' , err.message)
        }
    }

}