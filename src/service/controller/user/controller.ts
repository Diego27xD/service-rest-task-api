import { Request, Response } from "express";
import { UserService } from "../../../BL/userBL";
import { CustomResponse } from "../../../UTIL/response/success.response";
import { CustomError } from "../../../UTIL/response/error.response";

export class UserController {
  constructor(private userService: UserService) {}

  public authLogin = (req: Request, res: Response) => {
    this.userService
      .authLogin(req.body)
      .then((result) =>
        CustomResponse.responseSuccess(200, result, res, "Login exitoso")
      )
      .catch((err) =>
        CustomError.responseError(err, res, "Error al loguearse")
      );
  };

  public authRegister = (req: Request, res: Response) => {
    this.userService
      .authRegister(req.body)
      .then((result) =>
        CustomResponse.responseSuccess(
          200,
          result,
          res,
          "Cuenta creada con éxito"
        )
      )
      .catch((err) =>
        CustomError.responseError(err, res, "Error al crear nueva cuenta")
      );
  };

  public validAuth = (req: Request, res: Response) => {
    const { user } = req.body;
    this.userService
      .validAuth(user)
      .then((result) =>
        CustomResponse.responseSuccess(
          200,
          result,
          res,
          "Cuenta creada con éxito"
        )
      )
      .catch((err) =>
        CustomError.responseError(err, res, "Error al crear nueva cuenta")
      );
  };
}
