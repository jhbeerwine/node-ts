import express, { Request, Response } from "express";
import { connection } from "../configure";
import { OkPacket, RowDataPacket } from "mysql2";
import { queryResult } from "../utils/query";
import { authJwt } from "../middleware/";

import jwt from "jsonwebtoken";

const router = express.Router();

router.use(authJwt.verifyToken);

router.get("/read", async (req: Request, res: Response): Promise<any> => {
  console.log("read bbs");
  const queryString = `SELECT * FROM mybbs`;

  try {
    const result = await queryResult(queryString);
    res.json({ data: result });
  } catch (e) {
    console.log("error", e);
  }
});

router.get("/get-cookie", async (req: Request, res: Response): Promise<any> => {
  try {
    let randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie("cookieName", randomNumber, {
      maxAge: 900000,
      httpOnly: true,
      secure: true,
    });
    res.send({ message: "cookie set" });
  } catch (e) {
    console.log("error", e);
  }
});

router.get("/del-cookie", async (req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie("cookieName");
    res.send({ message: "cookie deleted" });
  } catch (e) {
    console.log("error", e);
  }
});

router.get("/test-token", async (req: Request, res: Response): Promise<any> => {
  console.log("test token");
  res.send("done");
});

router.post("/write", (req: Request, res: Response): void => {
  const { title, body } = req.body;
  const queryString = `INSERT INTO mybbs(title, body)
        VALUES("${title}", "${body}")`;

  connection.query(queryString, (error, result): void => {
    if (error) {
      throw error;
    }

    interface GenericIdentityFnExt {
      [key: number | string]: any;
    }

    const rows: GenericIdentityFnExt = result as RowDataPacket[];
    if (rows.serverStatus === 2) {
      res.json({ body: "쓰기 성공" });
    }
  });
});

export { router as bbsRouter };
