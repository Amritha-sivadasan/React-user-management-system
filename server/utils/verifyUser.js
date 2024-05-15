import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  console.log('fsjkjsfkh');
  const token = req.header("Authorization");
  console.log(token);

  if (!token){return res.status(401).json("You need to login");}

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)   return res.status(401).json("Token is invalid");
    req.user = user;
    next();
  });
};
