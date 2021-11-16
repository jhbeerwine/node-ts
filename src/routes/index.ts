import express, { Request, Response } from 'express';
import { queryResult } from '../query'

const router = express.Router();

router.get('/', async (req:Request, res:Response): Promise<any> => {
  res.send('root')
})

export { router as indexRouter }