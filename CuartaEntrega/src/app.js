import express from 'express'
import productsRouter from './routes/productsRouter.js'
import cartRouter from './routes/cartRouter.js'

const PORT = 3000

const app = express()

app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

app.listen(PORT, () => {
    console.log(` app corriendo en puerto: ${PORT}`)
})