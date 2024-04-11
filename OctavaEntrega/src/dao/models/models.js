import mongoose from "mongoose"
import paginate from "mongoose-paginate-v2"

const productColl = "products"
const cartsColl = "carts"
const messagesColl = "messages"
const userColl = 'users'


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
        stock: String,
        quantity: Number
    },
    {
        timestamps: true
    }
)

productSchema.plugin(paginate);

const cartsSchema = new mongoose.Schema(
    {
      products: {type:[
        {product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: productColl
        }}
      ]}
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

const usuarioSchema = new mongoose.Schema (
    {
        name: String, 
        email: {
            type: String, unique: true
        },
        password: String
    },
)




export const modeloProducts = mongoose.model(productColl, productSchema)
export const modeloCarts = mongoose.model(cartsColl, cartsSchema)
export const modeloMessages = mongoose.model(messagesColl, messagesSchema)
export const modeloUsers = mongoose.model(userColl, usuarioSchema)