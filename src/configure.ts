import express, { Request, Response, Application } from 'express';
import mysql from 'mysql2'
import * as dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT: Number | String = process.env.PORT || 8000;
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME
});

app.use(express.json());

export { app, PORT, connection }