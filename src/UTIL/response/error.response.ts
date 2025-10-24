import { Response } from "express";
import { TypeError } from "./typeErrors";

export class CustomError {
  constructor() {}
  static responseError(error: unknown, res: Response, message?: string) {
    if (error instanceof TypeError) {
      return res.status(error.statusCode).json({
        header: {
          ok: false,
          status: error.statusCode,
          error: error.message,
          message,
        },
      });
    }

    return res
      .status(500)
      .json({ header: { ok: false, error: "Internal Server Error" } });
  }
}
