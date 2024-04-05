import express from 'express'
import { productMongoManager } from '../dao/managers/productMongoManager.js'
import { modeloProducts } from '../dao/models/models.js'
const router = express.Router()

// import fs from 'fs'
// import path from 'path'
// import __dirname from '../utils.js'


const manager = new productMongoManager()

//endpoint para manejar el renderizado de la página home | products
router.get('/home', async (req,res) => {
  try {
    let {pagina, limit, title} = req.query

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

    let {
        docs:products,
        totalPages,
        prevPage, nextPage,
        hasPrevPage, hasNextPage,
        page,
    } = await modeloProducts.paginate(query,{limit:limit, page:pagina, lean: true})
        

    res.status(200).render('home', {
        products,
        totalPages,prevPage,
        nextPage,hasPrevPage,
        hasNextPage,page })
  } catch (err) {
        console.error('Error al obtener productos:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
  }
})


router.get('/chat', (req, res) => {
    res.setHeader('Content-Type','text/html').status(200).render('chat')

})


router.get('/realtimeproducts', (req,res) => {
    res.setHeader('Content-Type','text/html').status(200).render('realTimeProducts')

})
export default router 