import express from 'express'
const router = express.Router()
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { SECRET, creaHash, validaPassword } from '../utils.js';


// //ruta de registro
// router.post('/registro', async (req, res) => {
    
//         let { firstName, lastName, email, password } = req.body;
//         if (!firstName || !email || !lastName) {
//           return res,status(400).json({message: 'faltan datos. Por favor complete todos los campos'})
//         }

//         let existe = await userManager.getBy({ email });

//         if (existe) {
//           return res.status(400).json({message:`el usuario con email ${email} ya existe en nuestra base de datos`})
//         }

//         password = creaHash(password);
        
//         try {

//         let cart = await cartManager.addCart({"carrito":{"products":[]}})

//         let nuevoUser = await userManager.addUser({
//           firstName,
//           lastName,
//           email,
//           password,
//           cart: cart._id
//         });
        
//         return res.status(200).json({message: `El usuario ha sido creado correctamente`, nuevoUser})
//       } catch (err) {
//         return res.status(500).json({message: `ocurrió un error en el servidor, por favor contacte al admin. Detalle: ${err.message}`})
//       }
// });

// // Ruta de inicio de sesión
// router.post('/login', async(req, res) => {

//     let {email, password} = req.body

//     if(!email || !password) {
//         return res.status(400).json({message: 'faltan datos. Por favor complete todos los campos'})
//     }

    

//     try {
    
//         let usuario = await userManager.getBy({ email });

//         validaPassword(usuario, password)

//         if (!usuario) {
//           return res.status(500).json({message: 'Credenciales incorrectas'})
//         }

//         if (!validaPassword(usuario, password)) {
//             return res.status(400).json({message:'Credenciales incorrectas'})
//         }

//         usuario = {...usuario}
//         delete usuario.password

//         let token = jwt.sign(usuario,SECRET, {expiresIn:'2h'})

//         return res
//         .status(200)
//         .cookie('cookieLogin', token, {maxAge: 1000*120*120, signed:true, httpOnly: true})
//         .json({message: 'usuario logueado correctamente', usuario});
//       } catch (err) {
//         return res.status(500).json({message: `ocurrió un error en el servidor, por favor contacte al admin. Detalle: ${err.message}`})
//       }
// });


// // Ruta de cierre de sesión
// router.get('/logout', (req, res) => {
//     req.session.destroy(e=>{
//         if(e){
//             res.setHeader('Content-Type','application/json');
//             return res.status(500).json(
//                 {
//                     error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
//                     detalle:`${e.message}`
//                 }
//             )
            
//         }
//     })
    
//     res.setHeader('Content-Type','application/json');
//     res.status(200).json({
//         message:"Logout exitoso"
//     });
// });

// //ruta con para usuario autenticado

// router.get('/current', passport.authenticate("jwt", {session:false}), (req,res)=>{


//     res.setHeader('Content-Type','application/json');
//     res.status(200).json({
//         mensaje:'Perfil usuario',
//         datosUsuario: req.user
//     });
// });




// //github
// router.get('/github', passport.authenticate("github", {}), () => {
    
// })
// router.get('/callbackGithub', passport.authenticate("github", {}), (req, res) => {
//     try {
//         // Se guarda el usuario en la sesión
//         req.session.usuario = req.user;

//         // Se envía una respuesta con el usuario autenticado
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(200).json({
//             payload: 'Login correcto',
//             usuario: req.user
//         });
//     } catch (error) {
//         console.error('Error en callbackGithub:', error);
//         return res.status(500).redirect('/errorGithub');
//     }
// });


// router.get("/errorGitHub", (req, res)=>{
//     res.setHeader('Content-Type','application/json');
//     return res.status(500).json(
//         {
//             error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
//             detalle:`Fallo al autenticar con GitHub`
//         }
//     )
// })



export default router

