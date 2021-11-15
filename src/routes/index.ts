import express, { Request, Response } from 'express';
import { queryResult } from '../query'

const router = express.Router();

router.get('/', async (req:Request, res:Response): Promise<any> => {
  try {
    const result = await queryResult('SELECT * FROM mybbs')
    res.json(result)
  } catch(e) {
    console.log('error', e)
  }
})

export { router as indexRouter }