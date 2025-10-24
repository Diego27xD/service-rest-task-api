import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {
  constructor() {}

  static async ValidateJWT(req: Request, res: Response, next: NextFunction) {
    try {
      next();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
