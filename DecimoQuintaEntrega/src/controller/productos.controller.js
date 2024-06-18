import mongoose from "mongoose";
import { productoService } from "../services/products.services.js";
import {fakerES_MX as faker} from '@faker-js/faker'



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
        
        const resultadoPaginate = await productoService.obtenerProductos(parametrosPaginate)

        let {
            products,
            totalPages,
            prevPage, nextPage,
            hasPrevPage, hasNextPage,
            page,
        } = resultadoPaginate

        const prevLink = hasPrevPage ? `/api/products/${pagina - 1}` : null;
        const nextLink = hasNextPage ? `/api/products/${pagina + 1}` : null;

        const resultado = {products, totalPages, prevPage, nextPage, page, hasNextPage, hasPrevPage, prevLink, nextLink}

        res.setHeader('Content-Type','text/html').status(200).render('home', resultado)
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
    
            let existe = await productoService.obtenerProductoPorCodigo(code)
    
            if(existe){
                res.setHeader('Content-Type','application/json')
                return res.status(400).json({error:`el producto con el código ${code} ya está ingresado en la base de datos`})
            }
        
        
        
        try {
            
            const productoAgregado = await productoService.agregarProducto({ title, description, price, code, stock })
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
            let producto = await productoService.obtenerProductoPorId(id)
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
            let actualizado = await productoService.actualizarProducto(id, aModificar)
            if(actualizado.modifiedCount>0){
                res.status(200).json({
                    message:`Producto con id:${id} modificado`
                })
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`No existen prdductos con id ${id}`})
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
            let resultado = await productoService.eliminarProducto(id)
            if(resultado.deletedCount>0){
                res.status(200).json({
                    message:`Producto id:${id} eliminado de la base de datos`
                })
            }else{
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`No existen productos con id ${id}`})
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

    //faker
      static   generaFakeProducts = (req, res) => {
            try {
                const productos = [];
    
                for (let i = 0; i < 100; i++) {
                    const producto = {
                        _id: faker.database.mongodbObjectId(),
                        title: faker.commerce.product(),
                        description: faker.commerce.productDescription(),
                        price: faker.commerce.price({ min: 100, max: 50000 }),
                        code: faker.number.int({ min: 10, max: 5000000 }),
                        stock: faker.number.int({ min: 10, max: 1000 }),
                        quantity: faker.number.int({ min: 10, max: 500 }),
                    };
                    productos.push(producto);
                }
    
                return res.status(200).json({
                    mensaje: 'Productos creados con éxito',
                    productos
                });
    
            } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(500).json({
                    error: 'Error inesperado en el servidor - Intente más tarde, o contacte a su administrador',
                    detalle: `${err.message}`
                });
            }

    }
    
}
