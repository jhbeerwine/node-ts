import { Request, Response } from "express";

interface OptObj<T> {
  [string: number | string]: T;
}

interface Req extends Request {
  [key: number | string]: any;
}

export type { OptObj, Req };
