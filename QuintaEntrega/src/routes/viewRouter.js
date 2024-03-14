import express, { json } from 'express'
const router = express.Router()
// import fs from 'fs'
// import path from 'path'
// import __dirname from '../utils.js'

import { productManager } from '../managers/ProductManager.js'

const manager = new productManager()

router.get('/home', async (req,res) => {

    const products = await manager.getProducts()

    res.status(200).render('home', {products})
})


router.get('/realtimeproducts', (req,res) => {

    res.status(200).render('realTimeProducts')

})
export default router 