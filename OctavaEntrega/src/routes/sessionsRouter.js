import express from 'express'
const router = express.Router()
import { creaHash, validaPassword } from '../utils.js';
import { userMongoManager } from '../dao/managers/userMongoManager.js';


let userManager = new userMongoManager()


//ruta de registro
router.post('/registro', async (req, res) => {
   
    let {nombre, email, password} = req.body
    if (!nombre || !email || !password) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Faltan datos`})
    }

    let existe = await userManager.getBy({email})

    if(existe) {
        res.setHeader('Content-Type','application/json');
        return res.status(409).json({error:`ya existen ususarios con el mail ${email}`})
    }

    password = creaHash(password)

    try {
        let nuevoUser = await userManager.addUser({nombre, email, password})
        res.setHeader('Content-Type','application/json')
    res.status(200).json({
        message:"Usuario regstrado correctamente", nuevoUser
    })
    } catch (err) {
        return res.redirect(`/registro?error=Error 500 - error inesperado`)
    }
});

// Ruta de inicio de sesión
router.post('/login', async(req, res) => {
    try {
        let {email, password} =req.body
    if(!email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Faltan datos`})
    }

    let usuario = await userManager.getBy({email})

    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales incorrectas`})
    }

    if(!validaPassword(usuario, password)){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales incorrectas`})
    }

    usuario={...usuario}
    delete usuario.password
    req.session.usuario=usuario 

    res.setHeader('Content-Type','application/json')
    res.status(200).json({
        message:"Login correcto", usuario
    })
    } catch (err) {
        res.status(500).json({error: 'error en el servidor'})
    }
});

// Ruta de cierre de sesión
router.get('/logout', (req, res) => {
    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${e.message}`
                }
            )
            
        }
    })
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        message:"Logout exitoso"
    });
});







export default router

