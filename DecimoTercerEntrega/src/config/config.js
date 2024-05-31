import dotenv from "dotenv"
import {Command, Option} from 'commander'

const programa = new Command()

programa.addOption(new Option("-m --mode <MODE>", "Modo de ejcucuión del programa").choices(["dev", "prod"]).default("dev"))

dotenv.config(
    {
        path:"./src/.env", 
        override: true
    }
)

const config = {
    PORT:process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL,
    DB_NAME: process.env.DB_NAME
}

export default config