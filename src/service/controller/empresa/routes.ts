import { Router } from "express";
import { EmpresaService } from "../../../BL/empresaBL";
import { EmpresaSourceImpl } from "../../../DA/datasource/empresaDA.impl";
import { EmpresaController } from "./controller";
import { AuthMiddleware } from "../../../middleware/auth.middleware";

export class EmpresaRouter {
  static get routes(): Router {
    const empresaRepository = new EmpresaSourceImpl();
    const empresaService = new EmpresaService(empresaRepository);
    const empresaController = new EmpresaController(empresaService);

    const router = Router();

    /**
     * @swagger
     * components:
     *  schemas:
     *      Empresa:
     *          type:   object
     *          properties:
     *              nombreEmpresa:
     *                  type: string
     *                  description: escribir nombre
     *          required:
     *              - nombreEmpresa
     *      ResponseSuccess:
     *          type:   object
     *          properties:
     *              ok:
     *                  type: boolean
     *                  description: Success
     */

    /**
     * @swagger
     * /v1/api/empresa:
     *  get:
     *    summary: Get All
     *    tags: [Listar empresas]
     *    responses:
     *          200:
     *              description: Lista de empresas
     */
    router.get("/", empresaController.obtenerListaEmpresas);

    /**
     * @swagger
     * /v1/api/empresa:
     *  post:
     *    summary: Post item
     *    tags: [Crear Empresa]
     *    requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Empresa'
     *    responses:
     *          200:
     *              description: Lista de empresas
     */
    router.post("/", empresaController.crearEmpresa);

    /**
     * @swagger
     * /v1/api/empresa/token:
     *  get:
     *    summary: Get item
     *    tags: [Generar token]
     *    responses:
     *          200:
     *              description: Token generado
     */

    router.get("/token", empresaController.generarToken);

    // EXAMPLE CONTROLLER WITH MIDDLEWARE
    router.get(
      "/empresas",
      AuthMiddleware.ValidateJWT,
      empresaController.obtenerListaEmpresas
    );

    return router;
  }
}
