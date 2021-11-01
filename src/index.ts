import { app, PORT, connection } from './configure'
import { Request, Response } from 'express';
import { OkPacket, RowDataPacket } from "mysql2";

// const PORT = process.env.PORT || 8000;

connection.connect();

app.get("/", (req: Request, res: Response): void => {
  const queryString =
    `SELECT 
      firstName, 
      lastName, 
      officeCode
    FROM
      employees
    WHERE
      lastName LIKE '%son'
    ORDER BY officeCode;`

  connection.query(queryString, (error, result): void => {
    if (error) throw error;

    const rows = <RowDataPacket[]>result;
    console.log(rows)
  });
  res.send('?')
  // connection.end();
});

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});