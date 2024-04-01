
import { modeloProducts } from '../models/models.js';

export class productMongoManager {
    addProduct = async (product) => {
        try {
            return await modeloProducts.create(product)
        } catch (err) {
            console.log('error inesperado. Detalle:' , err.message)
        }
    }

    getProducts =  async () => {
        try {
            return await modeloProducts.find()
        } catch (err) {
            console.log('error inesperado. Detalle:' , err.message)
        }
    }


    // **********  Esto lo quise configurar para que enviara los datos para renderizar pero no me lo permitió el tema del page, no supe como cambiarle el valor enviandoló desde acá. 

    
    // getProductsForRender = async () => {
    //     try {
    //         let {
    //             docs:products,
    //             totalPages,
    //             prevPage, nextPage,
    //             hasPrevPage, hasNextPage,
    //             page
    //         } = await modeloProducts.paginate({},{limit:3, page:3, lean: true})

    //         const productos = {products, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage, page}
    //         return productos
    //     } catch (err) {
    //         console.log('error inesperado. Detalle:' , err.message)
    //     }
    // }

    getProductById = async (id) => {
        try {
            return await modeloProducts.findById(id).lean()
        } catch (err) {
            console.log('error inesperado. Detalle:' , err.message)
        }
    }

    getProductByCode = async (code) => {
        try {
            return await modeloProducts.findOne({code}).lean()

        } catch (err) {
            console.log('error inesperado. Detalle:' , err.message)
        }
    }

    updateProduct = async(id, actualizacion = {}) =>{
        try {
            return await modeloProducts.updateOne({_id:id}, actualizacion)
        } catch (err) {
            console.log('error inesperado. Detalle:' , err.message)
        }
    }

    deleteProduct = async (id) => {
        try {
            return await modeloProducts.deleteOne({_id:id})
        } catch (err) {
            console.log('error inesperado. Detalle:' , err.message)
        }
    }

}