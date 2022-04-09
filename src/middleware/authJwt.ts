import { NextFunction, Request, Response } from "express";
import { connection } from "../configure";
import { OkPacket, RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";
import moment from "moment";
import { tzoffset, toIsoDate } from "../utils/date";
import morgan from "morgan";

import type { Req } from "../interface/common";

interface DecdMember {
  memid?: string;
  iat?: number;
  exp?: number;
  iss?: string;
}

const authJwt = {
  verifyToken: (req: Req, res: Response, next: NextFunction) => {
    const key = process.env.TOKEN_KEY || "";
    const { accessToken: token }: any = req.cookies;

    if (!token) {
      morgan.token("customError", () => "No token provided!");
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    jwt.verify(
      token,
      key,
      (err: any, decoded: any) => {
        if (err) {
          morgan.token("customError", () => err.message);
          return res.status(401).send({
            message: err.message,
          });
        }
        const { memid } = decoded as DecdMember;
        const queryString = `SELECT token_date from mymembers where member_id = "${memid}"`;

        connection.query(queryString, (error, result): void => {
          if (error) {
            throw error;
          }

          const rows = result as RowDataPacket[];
          const sTime = toIsoDate(rows[0].token_date);
          const cTime = toIsoDate(new Date(Date.now() - tzoffset));
          const diff = moment(cTime, "YYYY-MM-DD HH:mm:ss").diff(
            moment(sTime, "YYYY-MM-DD HH:mm:ss")
          );

          next();
        });
      }
    );
  },
};

export default authJwt;
