import mongoose from "mongoose";
import { productMongoDAO  } from "../dao/productMongoDAO.js";

const productDAO = new productMongoDAO()

export default class productController {

    static getProducts = async (req, res) => {
        try {
            let {pagina, limite, title, description, sort} = req.query
    
        //manejo de limit
        if(!limite) {
            limite = 5
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

        const parametrosPaginate = {query, limite, pagina}
        
        const resultadoPaginate = await productDAO.getProducts(parametrosPaginate)

        let {
            products,
            totalPages,
            prevPage, nextPage,
            hasPrevPage, hasNextPage,
            page,
        } = resultadoPaginate

        const prevLink = hasPrevPage ? `/api/products/${pagina - 1}` : null;
        const nextLink = hasNextPage ? `/api/products/${pagina + 1}` : null;

        const resultado = {payload:{products}, totalPages, prevPage, nextPage, page, hasNextPage, hasPrevPage, prevLink, nextLink}

        res.status(200).json({resultado})
          } catch (err) {
                console.error('Error al obtener productos:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
          }
    }

    static addProduct = async (req, res) => {
        let {title, description, price, code, stock} = req.body
    
            if (!title || !price || !code || !stock ) {
                res.setHeader('Content-Type','application/json')
                return res.status(400).json({error:'Faltan datos: título, precio, código y stock son obligarorios'})
            }
    
            let existe = await productDAO.getProductByCode(code)
    
            if(existe){
                res.setHeader('Content-Type','application/json')
                return res.status(400).json({error:`el producto con el código ${code} ya está ingresado en la base de datos`})
            }
        
        
        
        try {
            
            const productoAgregado = await productDAO.addProduct({ title, description, price, code, stock })
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
    }

    static getProductById = async (req,res) => {
        let {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Id invalido`})
        }
    
        try {
            let producto = await productDAO.getProductById(id)
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
    
    }

    static modifyProductById = async(req, res) => {

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
            let actualizado = await productDAO.updateProduct(id, aModificar)
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
    
    
    }

    static deleteProduct = async (req, res) => {
        let {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Id invalido`})
        }
    
        try {
            let resultado = await productDAO.deleteProduct(id)
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
                    detalle:`${err.message}`
                }
            )
        }
    }



}