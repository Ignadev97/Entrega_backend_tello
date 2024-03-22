import express from 'express'
import { productMongoManager } from '../dao/managers/productMongoManager.js'
const router = express.Router()
// import fs from 'fs'
// import path from 'path'
// import __dirname from '../utils.js'


const manager = new productMongoManager()

router.get('/home', async (req,res) => {

    const products = await manager.getProducts()

    res.status(200).render('home', {products})
})


router.get('/chat', (req, res) => {
    res.setHeader('Content-Type','text/html').status(200).render('chat')

})


router.get('/realtimeproducts', (req,res) => {

    res.setHeader('Content-Type','text/html').status(200).render('realTimeProducts')

})
export default router 