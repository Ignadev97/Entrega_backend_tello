import express from 'express'
//import de routers
import cartMongoRouter from './routes/cartMongoRouter.js'
import viewRouter from './routes/viewRouter.js'
import productMongoRouter from './routes/productMongoRouter.js'
import sessionsRouter from './routes/sessionsRouter.js'
//utilidades
import __dirname, { SECRET } from './utils.js'
import path from 'path'
//handlebars
import handlebars from 'express-handlebars'
//webSocket
import {Server} from 'socket.io'
//mongoose
import mongoose from 'mongoose'
//passport
import inicializaPassport from './config/passport.config.js'
import passport from 'passport'
//cockieParser
import cookieParser from 'cookie-parser'


const PORT = 3000

//app.use() -> método de express para montar middleware

const app = express()

app.use(express.json()) //middleware para analizar los JSON entrantes

//handlebars
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, 'public')))  //middleware para servir archivos estáticos  

app.get('/', (req, res) => {
    res.status(200).render("inicio")
})


//passport 
inicializaPassport()
app.use(passport.initialize())
//cookie parser
app.use(cookieParser(SECRET))
//routers

app.use('/api/products', productMongoRouter)
app.use('/api/cart', cartMongoRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/', viewRouter)




const server = app.listen(PORT, () => {
    console.log(` app corriendo en puerto: ${PORT}`)
})


//ESTO ME INCOMODA ACÁ. 

let mensajes=[]
let usuarios=[]

const io=new Server(server)   // websocket server

io.on("connection", socket=>{
    console.log(`Se conecto un cliente con id ${socket.id}`)
    
    socket.on("presentacion", nombre=>{
        usuarios.push({id:socket.id, nombre})
        socket.emit("historial", mensajes)
        // console.log(nombre)
        socket.broadcast.emit("nuevoUsuario", nombre)
    })

    socket.on("mensaje", (nombre, mensaje)=>{
        mensajes.push({nombre, mensaje})
        io.emit("nuevoMensaje", nombre, mensaje)
    })

    socket.on("disconnect", ()=>{
        let usuario=usuarios.find(u=>u.id===socket.id)
        if(usuario){
            socket.broadcast.emit("saleUsuario", usuario.nombre)
        }
    })

})




const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://ignaciotellodev:3376530037518001@cluster0.n9mzqxw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {dbName: "ecommerce"} )
        console.log("db online")
    } catch (err) {
        console.log("Falló la conexión. Detalle ", err.message)
    }
}
connect()
 