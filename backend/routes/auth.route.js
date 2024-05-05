import express from "express";
import {
  // importing controllers
  login,
  logout,
  signUp,
} from "../controllers/Auth.controller.js";
import { uploadAvatar } from "../middlewares/multer.js";

// router for Authorisation
const AuthRouter = express.Router();

AuthRouter.post("/login", login);

AuthRouter.post("/signup", uploadAvatar, signUp);

AuthRouter.post("/logout", logout);

export default AuthRouter;
