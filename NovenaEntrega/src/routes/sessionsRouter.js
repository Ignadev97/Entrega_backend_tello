import express from 'express'
const router = express.Router()
import { userMongoManager } from '../dao/managers/userMongoManager.js';
import passport from 'passport';


let userManager = new userMongoManager()


router.get("/errorRegistro", (req, res) => {
    return res.redirect("/reistro?error=Error en el proceso de registro...!!")
})



//ruta de registro
router.post('/registro', passport.authenticate("register",{failureRedirect:"/api/sessions/errorRegistro"}), async (req, res) => {
    console.log(req.user)
    res.status(200).json({mensaje:`Registro exitoso para ${req.user.nombre}`})
});

router.get("/errorLogin", (req, res) => {
    return res.redirect("/login?error=Error en el proceso de login")
})


// Ruta de inicio de sesión
router.post('/login', passport.authenticate("login", {failureRedirect:"/api/sessions/errorLogin"}), async(req, res) => {
    try {
    
    let usuario = req.user

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


//github
router.get('/github', passport.authenticate("github", {}), () => {
    
})
router.get('/callbackGithub', passport.authenticate("github", {}), (req,res) => {

    req.session.usuario = req.user
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({
        payload:'login correcto',
        usuario: req.user
    })
})




export default router

