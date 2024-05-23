import passport from "passport";
import github from "passport-github2";
import passportjwt from "passport-jwt";
import jwt from "jsonwebtoken"

import { SECRET } from "../utils.js";





//función buscaToken jwt

const buscaToken=(req)=>{
  let token=null

  if(req.signedCookies.cookieLogin){
      token=req.signedCookies.cookieLogin
  }

  return token
}

// 1 defunir función configuración

const inicializaPassport = () => {

  //github
//   passport.use(
//     "github",
//     new github.Strategy(
//         {
//             clientID:"Iv1.448423cf95937f0d",
//             clientSecret:"63a79ae0f71e6fc2fb5d337cfd691d635473ae3b",
//             callbackURL:"http://localhost:3000/api/sessions/callbackGithub"
//         },
//         async (accesToken, refreshToken, profile, done) => {
//              try {
//                 let name = profile._json.name
//                 let email = profile._json.email
//                 let usuario = await userManager.getBy({email})

//                 if(!usuario){
//                      usuario = await userManager.addUser({
//                         name,
//                         email,
//                         profileGithub: profile
//                      })
//                 }

//                 return done(null,usuario)
//             } catch (error) {
//                 return done(error)
//             }
//         }
//     )
//   )

//   passport.use(
//     "jwt",
//     new passportjwt.Strategy(
//         {
//             secretOrKey: SECRET,
//             jwtFromRequest: new passportjwt.ExtractJwt.fromExtractors([buscaToken])
//         },
//         async (contenidoToken, done)=>{
//             try {
                
//                 return done(null, contenidoToken)
//             } catch (error) {
//                 return done(error)
//             }
//         }
//     )
// )
};

export default inicializaPassport;
