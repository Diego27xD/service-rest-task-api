import { Request, Response } from "express";
import { CustomResponse } from "../../../UTIL/response/success.response";
import { CustomError } from "../../../UTIL/response/error.response";
import { StatusService } from "../../../BL/statusDA.impl";

export class StatusController {
  constructor(private statusService: StatusService) {}
  public getAllList = (req: Request, res: Response) => {
    this.statusService
      .getAll()
      .then((result) =>
        CustomResponse.responseSuccess(200, result, res, "Lista encontrada")
      )
      .catch((err) =>
        CustomError.responseError(err, res, "Error al consultar data")
      );
  };
}
