import express, { Request, Response } from 'express';
import { connection } from '../configure'
import { OkPacket, RowDataPacket } from "mysql2";
import { queryResult } from '../utils/query'
import encrypt from '../utils/encrypt'

const router = express.Router();

router.get('/list', async (req:Request, res:Response) :Promise<any> => {
  const queryString:string
    = `SELECT * FROM mymembers` 

  try {
    const result = await queryResult(queryString)
    res.json({body: result})
  } catch(e) {
    console.log('error', e)
  }
})

router.post('/signup', async (req:Request, res:Response) :Promise<any> => {
  const {memid, mempw} = req.body
  const {salt, hashed} = await encrypt.procEncryption(mempw);
  
  const queryString:string
    = `INSERT INTO mymembers(member_id, member_pw, salt)
        VALUES("${memid}", "${hashed}", "${salt}")`

  connection.query(queryString, (error, result): void => {
    if (error) throw error;
    
    const rows:any = <RowDataPacket[]>result;
    if (rows.serverStatus === 2) res.json({body:'가입 성공'})
  });
})

router.post('/signin', async (req:Request, res:Response) :Promise<any> => {
  const {memid, mempw} = req.body
  
  const queryString:string
    = `SELECT salt, member_pw from mymembers where member_id = "${memid}"`

  connection.query(queryString, async (error, result): Promise<any> => {
    if (error) throw error;
    
    const rows:any = <RowDataPacket[]>result;
    
    if (rows.length === 0) res.json({body:'해당 아이디 없음'})
    if (rows[0]) {
      const {member_pw, salt} = rows[0]
      const {hashed} = await encrypt.procEncryption(mempw, salt);

      if (member_pw === hashed) {
        res.json({body:'로그인 성공'})
      } else {
        res.json({body:'로그인 실퍠'})
      }
    }
    
  });
})

export { router as membersRouter }