import mongoose from "mongoose"

const productColl = "products"
const cartsColl = "carts"
const messagesColl = "messages"


const productSchema = new mongoose.Schema(
    {
        title: String,
        description: String, 
        price: Number, 
        code: {
            type: Number, 
            required: true, 
            unique: true
        },
        stock: String
    },
    {
        timestamps: true
    }
)
const cartsSchema = new mongoose.Schema(
    {
       // acá va lo explicado en la clase del  20/3
    },
    {
        timestamps: true
    }
)
const messagesSchema = new mongoose.Schema(
    {
        email: String, 
        user: String, 
        message: String
    },
    {
        timestamps: true
    }
)

export const modeloProducts = mongoose.model(productColl, productSchema)
export const modeloCarts = mongoose.model(cartsColl, cartsSchema)
export const modeloMessages = mongoose.model(messagesColl, messagesSchema)