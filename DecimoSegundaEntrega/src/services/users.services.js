import { authMongoDAO as DAO} from "../dao/mongo/authDAO.js";

class UsuariosService {
    constructor(dao) {
        this.dao = new dao();
    }

    async agregarUsuario(usuario) {
        try {
            return await this.dao.addUser(usuario);
        } catch (error) {
            console.error('Error al agregar usuario:', error);
        }
    }

    async obtenerUsuarioBy(filtro) {
        try {
            return await this.dao.getBy(filtro);
        } catch (error) {
            console.error('Error al obtener usuario por filtro:', error);
        }
    }
}


export const userService = new UsuariosService(DAO);