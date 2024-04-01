import express from 'express'
//import de routers
import cartMongoRouter from './routes/cartMongoRouter.js'
import viewRouter from './routes/viewRouter.js'
import productMongoRouter from './routes/productMongoRouter.js'
//utilidades
import __dirname from './utils.js'
import path from 'path'
//handlebars
import handlebars from 'express-handlebars'
//webSocket
import {Server} from 'socket.io'
//mongoose
import mongoose from 'mongoose'
import { productMongoManager } from './dao/managers/productMongoManager.js'

const manager = new productMongoManager()

const PORT = 3000


let io

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


//routers

app.use('/api/products', productMongoRouter)
app.use('/api/cart', cartMongoRouter)
app.use('/', viewRouter)



const server = app.listen(PORT, () => {
    console.log(` app corriendo en puerto: ${PORT}`)
})


//ESTO ME INCOMODA ACÁ. 
io = new Server(server)

io.on("connection",async socket => {
    console.log(`se ha conectado el cliente con id ${socket.id}`)
    
    const data = await manager.getProducts()
    socket.emit('datos', data)

    socket.on('agregarProducto', (producto) => {
       manager.addProduct(producto) //no sé porque no se actualiza como con fs
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
 