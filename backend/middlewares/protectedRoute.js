import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    // console.log("Cookies is here", req.headers);
    // const token = req.cookies.jwt;
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = authHeader.split(" ")[1];

      // console.log("Bearer token cookie : ", token);
      // console.log(token);

      if (!token) {
        console.log("protected route: unauthorised");
        return res.status(404).json({
          error: "Unauthorized- No token found",
        });
      }

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (!decode) {
        return res.status(401).json({
          error: "Invalid token",
        });
      }

      const user = await User.findById(decode.userId);
      // console.log(user);

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      req.user = user;
      // console.log("user varified");
      next();
    } else {
      console.log("Header is not found");
      return res.status(404).json({
        error: "Send req header",
      });
    }
  } catch (error) {
    console.log("error in protected route", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
