import { Request, Response } from "express";
import { CustomResponse } from "../../../UTIL/response/success.response";
import { CustomError } from "../../../UTIL/response/error.response";
import { PriorityService } from "../../../BL/priorityDA.impl";

export class PriorityController {
  constructor(private priorityService: PriorityService) {}
  public getAllList = (req: Request, res: Response) => {
    this.priorityService
      .getAll()
      .then((result) =>
        CustomResponse.responseSuccess(200, result, res, "Lista encontrada")
      )
      .catch((err) =>
        CustomError.responseError(err, res, "Error al consultar data")
      );
  };
}
