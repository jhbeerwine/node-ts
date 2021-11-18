import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

const authJwt = {
  verifyToken: (req: any, res: any, next: any) => {
    const key = process.env.TOKEN_KEY || "";
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    // SELECT TIMESTAMPDIFF(MINUTE, '2021-11-18 17:12:18', CURRENT_TIMESTAMP)

    jwt.verify(
      token,
      process.env.TOKEN_KEY as string,
      (err: any, decoded: any) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!",
          });
        }
        req.memid = decoded.id;
        console.log("authorized");
        next();
      }
    );
  },
};

export default authJwt;
