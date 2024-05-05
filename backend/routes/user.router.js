import express from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import {
  AcceptRequest,
  cancelRequest,
  getFriends,
  getusers,
  me,
  sendOrUnsendRequest,
  unfriend,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/me", protectedRoute, me);

userRouter.get("/getfriends", protectedRoute, getFriends);

userRouter.get("/getusers", protectedRoute, getusers);

userRouter.post("/sendrequest/:id", protectedRoute, sendOrUnsendRequest);

userRouter.post("/acceptrequest/:id", protectedRoute, AcceptRequest);

userRouter.post("/rejectrequest/:id", protectedRoute, cancelRequest);

userRouter.post("/unfriend/:id", protectedRoute, unfriend);

export default userRouter;
