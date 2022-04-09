import express, { Request, Response, NextFunction, Application } from "express";
import path from "path";
import fs from "fs";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import cookieParser from "cookie-parser";
import httpLogger from "./utils/logger/httpLogger";
import morganMiddleware from "./utils/logger/morganMiddleware";
import HttpException from "./utils/exceptions";
import {} from "./types/global";

try {
  dotenv.config({
    path: path.resolve(
      String(process.env.NODE_ENV).trim() === "development"
        ? ".env.dev"
        : ".env"
    ),
  });
} catch (e) {
  console.warn(e);
}

const app: Application = express();
const PORT: number | string = process.env.PORT || 443;
const connection: mysql.Connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  timezone: "Z",
});

global.db = connection;

const corsOptions: any = {
  changeOrigin: true,
  target: "http://localhost:3000",
};

const options = {
  key: fs.readFileSync(path.join(__dirname + "/../certs/key-asdfasdfasd.pem")),
  cert: fs.readFileSync(path.join(__dirname + "/../certs/cert-test-mine.pem")),
};

// https 인 경우 필요
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morganMiddleware);
// app.use(function (
//   err: HttpException,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

routes(app);

export { app, options, PORT, connection };
