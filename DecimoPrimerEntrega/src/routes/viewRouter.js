import express from 'express'

import { modeloProducts } from '../dao/models/models.js'
import { auth } from '../middlewares/auth.js'
const router = express.Router()

// // import fs from 'fs'
// // import path from 'path'
// // import __dirname from '../utils.js'



// //endpoint para manejar el renderizado de la página home | products
// router.get('/', async (req,res) => {
//     res.setHeader('Content-Type','text/html').status(200).render('inicio', {login:req.session.usuario})
// })


// router.get('/chat', (req, res) => {
//     res.setHeader('Content-Type','text/html').status(200).render('chat')

// })


// router.get('/realtimeproducts', (req,res) => {
//     res.setHeader('Content-Type','text/html').status(200).render('realTimeProducts')

// })

// router.get('/registro', (req,res) => {
//     res.setHeader('Content-Type','text/html').status(200).render('registro', {login:req.session.usuario})

// })
// router.get('/login', (req,res) => {
//     res.setHeader('Content-Type','text/html').status(200).render('login', {login:req.session.usuario})

// })

// router.get('/perfil', auth,  (req,res) => {
//     res.setHeader('Content-Type','text/html').status(200).render('perfil', {login:req.session.usuario})

// })



export default router 