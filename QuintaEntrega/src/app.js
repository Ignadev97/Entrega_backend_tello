import express from 'express'
//import de routers
import productsRouter from './routes/productsRouter.js'
import cartRouter from './routes/cartRouter.js'
import viewRouter from './routes/viewRouter.js'
//utilidades
import __dirname from './utils.js'
import path from 'path'
//handlebars
import handlebars from 'express-handlebars'
//webSocket
import {Server} from 'socket.io'

// product manager
import { productManager } from './managers/ProductManager.js'

const manager = new productManager()

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

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)
app.use('/', viewRouter)



const server = app.listen(PORT, () => {
    console.log(` app corriendo en puerto: ${PORT}`)
})

io = new Server(server)

io.on("connection",async socket => {
    console.log(`se ha conectado el cliente con id ${socket.id}`)
    
    const data = await manager.getProducts()
     
    // console.log(data)

    socket.emit('datos', data)

    socket.on('agregarProducto', async (producto) => {

        manager.addProduct(producto.nombre, producto.description, producto.price, producto.code, producto.stock)
    })
})


