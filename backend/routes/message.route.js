import express from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import { getchat, sendmessage } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.post("/sendmessage/:id", protectedRoute, sendmessage);

messageRouter.get("/getchat/:id", protectedRoute, getchat);

export default messageRouter;
