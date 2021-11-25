import express, { Request, Response } from "express";
import { connection } from "../configure";
import { OkPacket, RowDataPacket } from "mysql2";

const queryResult = (query: string) => {
  const result: Promise<any> = new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      const rows = <RowDataPacket[]>result;
      resolve(rows);
    });
  });

  return result;
};

export { queryResult };
