import { modeloUsers } from "./models/models.js";

export class authMongoDAO {

    addUser = async (usuario) => {
        try {
            return await modeloUsers.create(usuario)
        } catch (err) {
            console.log('error inesperado. Detalle:' , err.message)
        }
    }
 
    getBy =  async (filtro) => {
        try {
            return await modeloUsers.findOne(filtro).lean()
        } catch (err) {
            console.log('error inesperado. Detalle:' , err.message)
        }
    }

}