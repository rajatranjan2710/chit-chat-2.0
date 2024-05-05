import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

export const getRecieverSocket = (recieverId) => {
  return userSocketMap[recieverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("User connected ", socket.id);

  const userId = socket.handshake.query.userId;
  const userName = socket.handshake.query.userName;
  console.log("user got: ", userId);
  console.log("username: ", userName);
  if (userId !== undefined) {
    // console.log("mapping : ", userId);
    userSocketMap[userId] = socket.id;
  }
  // socket.on("sendUser", (user) => {
  //   // console.log("in send user socket");
  //   // console.log("username : ", user);
  // });
  io.emit("all", userSocketMap);

  io.emit("all", userId);
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //socket.on is used to listen events ,
  // it can be both on server as well as client
  socket.on("disconnect", () => {
    console.log("user has been disconnected");
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
