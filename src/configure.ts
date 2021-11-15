import express, { Request, Response, Application } from 'express';
import mysql from 'mysql2'
import * as dotenv from "dotenv";
import cors from 'cors'

import routes from './routes'
import { OptObj } from './interface/common'

dotenv.config();

const app: Application = express();
const PORT: Number | String = process.env.PORT || 8000;
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME
});

const corsOptions:OptObj<string> = {
  origin: "http://localhost:3030",
};

// 필요없는듯
// app.use(cors(corsOptions));
app.use(express.json());
routes(app);

export { app, PORT, connection }