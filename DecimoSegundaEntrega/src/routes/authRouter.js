import express from "express";
const router = express.Router();
import passport from "passport";
import authController from "../controller/auth.controller.js";

//ruta de registro
router.post("/registro", authController.register);

// Ruta de inicio de sesión
router.post("/login", authController.login);

// Ruta de cierre de sesión
router.get("/logout", authController.logout);

//ruta con para usuario autenticado

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  authController.getCurrentUser
);

//github
router.get(
  "/github",
  passport.authenticate("github", {}),
  authController.githubAuth
);

router.get(
  "/callbackGithub",
  passport.authenticate("github", {}),
  authController.githubAuthCallback
);

router.get("/errorGitHub", authController.errorGithub);

export default router;
