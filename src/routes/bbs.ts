import express, { Request, Response } from "express";
import { connection } from "../configure";
import { OkPacket, RowDataPacket } from "mysql2";
import { queryResult } from "../utils/query";
import { authJwt } from "../middleware/";

import jwt from "jsonwebtoken";

const router = express.Router();
const mid = (req: any, res: any, next: any) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
};
router.use(mid);

router.get(
  "/read",
  authJwt.verifyToken,
  async (req: Request, res: Response): Promise<any> => {
    const queryString: string = `SELECT * FROM mybbs`;

    try {
      const result = await queryResult(queryString);
      res.json({ body: result });
    } catch (e) {
      console.log("error", e);
    }
  }
);

router.get(
  "/test-token",
  [authJwt.verifyToken],
  async (req: Request, res: Response): Promise<any> => {
    console.log("test token");
    res.send("done");
  }
);

router.post("/write", (req: Request, res: Response): void => {
  const { title, body } = req.body;
  const queryString: string = `INSERT INTO mybbs(title, body)
        VALUES("${title}", "${body}")`;

  connection.query(queryString, (error, result): void => {
    if (error) throw error;

    const rows: any = <RowDataPacket[]>result;
    if (rows.serverStatus === 2) res.json({ body: "쓰기 성공" });
  });
});

export { router as bbsRouter };
