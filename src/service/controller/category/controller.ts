import { Request, Response } from "express";
import { CategoryService } from "../../../BL/categoryDA.impl";
import { CustomResponse } from "../../../UTIL/response/success.response";
import { CustomError } from "../../../UTIL/response/error.response";

export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  public getAllList = (req: Request, res: Response) => {
    this.categoryService
      .getAll()
      .then((result) =>
        CustomResponse.responseSuccess(200, result, res, "Lista encontrada")
      )
      .catch((err) =>
        CustomError.responseError(err, res, "Error al consultar data")
      );
  };
}
