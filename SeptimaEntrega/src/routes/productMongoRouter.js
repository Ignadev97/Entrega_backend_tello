import express from 'express'
import mongoose from "mongoose";
import { productMongoManager } from '../dao/managers/productMongoManager.js'


const router = express.Router()

const productManager = new productMongoManager()

// este sería el endpoint que debería recibir limit, page sort y query 
router.get('/', async (req, res) => {
    try {
        let productos = await productManager.getProducts()

        res.status(200).json({productos})
    } catch (err) {
        res.status(500).json({ error: 'No se pudo leer el archivo de productos', detalle: err.message });
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