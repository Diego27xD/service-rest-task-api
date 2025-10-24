import { NextFunction, Request, Response } from "express";
import { JWTUtil } from "../UTIL/JWT.util";
import { JWT_TOKEN_KEY } from "../config/envs";

export class AuthMiddleware {
  constructor() {}

  static async ValidateJWT(req: Request, res: Response, next: NextFunction) {
    try {
      type AuthPayload = { user: string };
      const authorization = req.header("Authorization");

      if (!authorization)
        return res.status(401).json({
          header: {
            ok: false,
            status: 401,
            error: "Acceso no proveido",
            message: "Error al intentar validar sesión",
          },
        });
      if (!authorization.startsWith("Bearer "))
        return res.status(401).json({
          header: {
            ok: false,
            status: 401,
            error: "Tipo de sesión no válida",
            message: "Error al intentar validar sesión",
          },
        });

      const token = authorization.split(" ").at(1) || "";
      const tokenClass = new JWTUtil(JWT_TOKEN_KEY.ACCESS);
      const result = await tokenClass.verifyToken<AuthPayload>(token);

      if (!result)
        return res.status(401).json({
          header: {
            ok: false,
            status: 401,
            error: "No autorizado",
            message: "Error al intentar validar sesión",
          },
        });

      req.body.user = result.user;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        header: {
          ok: false,
          status: 401,
          error: "Acceso no proveido",
          message: "Error al intentar validar sesión",
        },
      });
    }
  }
}
