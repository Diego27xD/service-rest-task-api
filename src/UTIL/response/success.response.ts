import { Response } from "express";

export class CustomResponse {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly data: { [key: string]: any },
    public readonly res: Response
  ) {}
  static responseSuccess(
    statusCode: number,
    data: { [key: string]: any } | string | number | unknown,
    res: Response,
    message?: string
  ) {
    return res
      .status(statusCode)
      .json({ header: { statusCode, message, ok: true }, body: data });
  }
}
