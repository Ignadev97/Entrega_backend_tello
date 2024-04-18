import passport from "passport";
import local from "passport-local";
import github from "passport-github2";
import {userMongoManager } from "../dao/managers/userMongoManager.js";
import { creaHash, validaPassword } from "../utils.js";

const userManager = new userMongoManager();

// 1 defunir función configuración

const inicializaPassport = () => {
    //local
  passport.use(
    "register",
    new local.Strategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async function (req, username, password, done) {
        try {
          let { nombre, email } = req.body;
          if (!nombre || !email) {
            return done(null, false);
          }

          let existe = await userManager.getBy({ email });

          if (existe) {
            return done(null, false);
          }

          password = creaHash(password);

          let nuevoUser = await userManager.addUser({
            nombre,
            email,
            password,
          });

          return done(null, nuevoUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new local.Strategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (username, password, done) => {
        try {

          let usuario = await userManager.getBy({ email:username });

          if (!usuario) {
            return done(null, false)
          }

          if (!validaPassword(usuario, password)) {

              return done(null, false)
            }

          return done (null, usuario)  
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //github
  passport.use(
    "github",
    new github.Strategy(
        {
            clientID:"Iv1.448423cf95937f0d",
            clientSecret:"63a79ae0f71e6fc2fb5d337cfd691d635473ae3b",
            callbackURL:"http://localhost:3000/api/sessions/callbackGithub"
        },
        async (accesToken, refreshToken, profile, done) => {
             try {
                let name = profile._json.name
                let email = profile._json.email
                let usuario = await userManager.getBy({email})

                if(!usuario){
                     usuario = await userManager.addUser({
                        name,
                        email,
                        profileGithub: profile
                     })
                }

                return done(null,usuario)
            } catch (error) {
                return done(error)
            }
        }
    )
  )


  //1bis
  passport.serializeUser((usuario, done) => {
    return done(null, usuario._id);
  });

  passport.deserializeUser(async (id, done) => {
    let usuario = await userManager.getBy({ _id: id });
    return done(null, usuario);
  });

  //paso uno prima solo usando sessions (definiendo serializer y deserializer)
};

export default inicializaPassport;
