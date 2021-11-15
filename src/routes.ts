import express, { Application, Request, Response } from 'express';
import { indexRouter } from './routes/index'
import { bbsRouter } from './routes/bbs'

const router = express.Router();
const routes = (app:Application): void => {
  router.get("/", indexRouter);
  app.use("/bbs", bbsRouter);
  app.use(router)
}

export default routes;