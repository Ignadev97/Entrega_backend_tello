import express from 'express'
import mongoose from "mongoose";
import { productMongoManager } from '../dao/managers/productMongoManager.js'
import { modeloProducts } from '../dao/models/models.js';

const router = express.Router()

const productManager = new productMongoManager()

// este sería el endpoint que debería recibir limit, page sort y query 
router.get('/', async (req, res) => {
    try {
        let {pagina, limit, title, description, sort} = req.query
    
        //manejo de limit
        if(!limit) {
            limit = 5
        }
    
        //manejo de pagina
        if(!pagina) {
            pagina=1
        }
    
        //manejo de filtro de productos 
        let query = {}
    
        if (title) {
            query.title = title
        }
        if (description) {
            query.description = description
        }

        // manejo de orden 
        let sortOptions = {}

        if (sort == 'asc' || sort == 'desc') {
            sortOptions = {price: sort == 'asc' ? 1 : -1}
        }
    
        let {
            docs:products,
            totalPages,
            prevPage, nextPage,
            hasPrevPage, hasNextPage,
            page,
        } = await modeloProducts.paginate(query,{limit:limit, page:pagina, lean: true})

        const prevLink = hasPrevPage ? `/api/products/${pagina - 1}` : null;
        const nextLink = hasNextPage ? `/api/products/${pagina + 1}` : null;
        
        const resultado = {payload:{products}, totalPages, prevPage, nextPage, page, hasNextPage, hasPrevPage, prevLink, nextLink}

        res.status(200).json({resultado})
      } catch (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
      }
})

router.post('/', async (req, res) => {
    let {title, description, price, code, stock} = req.body

        if (!title || !price || !code || !stock ) {
            res.setHeader('Content-Type','application/json')
            return res.status(400).json({error:'Faltan datos: título, precio, código y stock son obligarorios'})
        }

        let existe = await productManager.getProductByCode(code)

        if(existe){
            res.setHeader('Content-Type','application/json')
            return res.status(400).json({error:`el producto con el código ${code} ya está ingresado en la base de datos`})
        }
    
    
    
    try {
        
        const productoAgregado = await productManager.addProduct({ title, description, price, code, stock })
        res.setHeader('Content-Type','application/json')
        res.status(200).json({message: 'se agregó el producto con éxito', payload: productoAgregado})

    } catch (err) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:err.message
            })
    }
})


router.get('/:id', async (req,res) => {
    let {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Id invalido`})
    }

    try {
        let producto = await productManager.getProductById(id)
        if(producto) {
            res.status(200).json({producto})
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`No existen usuarios con id ${id}`})
        }
    } catch (err) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${err.message}`
            }
        )
    }

})

router.put('/:id', async(req, res) => {

    let {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Id invalido`})
    }

    let aModificar=req.body
    if(aModificar._id){
        delete aModificar._id
    }

    try {
        let actualizado = await productManager.updateProduct(id, aModificar)
        if(actualizado.modifiedCount>0){
            res.status(200).json({
                message:`Usuario modificado con id ${id}`
            })
    }else{
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`No existen usuarios con id ${id}`})
    }}
     catch (err) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${err.message}`
            }
        )
    }


})

router.delete('/:id', async (req, res) => {
    let {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Id invalido`})
    }

    try {
        let resultado = await productManager.deleteProduct(id)
        if(resultado.deletedCount>0){
            res.status(200).json({
                message:`Usuario eliminado con id ${id}`
            })
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`No existen usuarios con id ${id}`})
        }

    } catch (err) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }
})
export default router