import express, { Request, Response, Application } from "express";
import path from "path";
import fs from "fs";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import cookieParser from "cookie-parser";
import {} from "../global";

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
  origin: "https://localhost:3000",
  credentials: true,
};

const options = {
  key: fs.readFileSync(__dirname + "/../certs/key.pem"),
  cert: fs.readFileSync(__dirname + "/../certs/cert.pem"),
};

// https 인 경우 필요
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
routes(app);

export { app, options, PORT, connection };
