import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  console.log("cookie is setting");
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // in miliseconds
    // httpOnly: false, // prevent from xss attack
    // secure: false,
    // sameSite: true, // prevent csrf attacks,
  });
  return token;
  // res.json({ message: "Login completed cookie sent!!" });

  console.log("cookie set succefully");
};

export default generateToken;
