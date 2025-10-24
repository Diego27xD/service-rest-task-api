import { Request, Response } from "express";
import { EmpresaService } from "../../../BL/empresaBL";
import { EmpresaCreateDto } from "../../../DTO/empresa/createDTO";
import { JWTUtil } from "../../../UTIL/JWT.util";
import { JWT_TOKEN_KEY } from "../../../config/envs";
import { CustomResponse } from "../../../UTIL/response/success.response";
import { CustomError } from "../../../UTIL/response/error.response";

export class EmpresaController {
  constructor(private empresaService: EmpresaService) {}

  public obtenerListaEmpresas = (req: Request, res: Response) => {
    this.empresaService
      .obtenerTotalEmpresas()
      .then((result) =>
        CustomResponse.responseSuccess(200, result, res, "Lista encontrada")
      )
      .catch((err) =>
        CustomError.responseError(err, res, "Error al consultar data")
      );
  };

  public crearEmpresa = (req: Request, res: Response) => {
    const [error, createEmpresaDto] = EmpresaCreateDto.create(req.body);
    if (error) return res.status(500).json({ ok: false, error });
    this.empresaService
      .crearEmpresa(createEmpresaDto!)
      .then((result) =>
        CustomResponse.responseSuccess(
          200,
          result,
          res,
          "Empresa creada con éxito!"
        )
      )
      .catch((err) =>
        CustomError.responseError(err, res, "Error al consultar data")
      );
  };

  public generarToken = (req: Request, res: Response) => {
    const tokenClass = new JWTUtil(JWT_TOKEN_KEY.JWT_TOKEN_TEST);
    tokenClass
      .generateToken({ id: 3 }, "7d")
      .then((result) =>
        CustomResponse.responseSuccess(
          200,
          { token: result },
          res,
          "Token generado"
        )
      )
      .catch((err) =>
        CustomError.responseError(err, res, "Error al generar token")
      );
  };
}
