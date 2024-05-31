import {fileURLToPath} from 'url'
import {dirname} from 'path'
import bcrypt from 'bcrypt'



export const SECRET = "nachokpo123"

//config dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//hasheo password
export const creaHash=password=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const validaPassword=(usuario, password)=>bcrypt.compareSync(password, usuario.password)


//passport
export const passportCall = (estrategia) => {
    return function (req, res, next) {
        passport.authenticate(estrategia, function (err, user, info, status) {
            if (err) { return next(err) }
            if (!user) {
                res.setHeader('Content-Type','application/json');
                return res.status(401).json({
                    error:info.message?info.message:info.toString(),
                    detalle:info.detalle?info.detalle:"-",

                })
            }
            req.user=user
            next()
        })(req, res, next);
    }
}






export default __dirname;