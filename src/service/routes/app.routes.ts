import { Router } from "express";
import { EmpresaRouter } from "../controller";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/v1/api/empresa", EmpresaRouter.routes);
    return router;
  }
}
