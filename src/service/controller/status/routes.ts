import { Router } from "express";
import { StatusController } from "./controller";

import { StatusSourceImpl } from "../../../DA/datasource/statusDA.impl";
import { StatusService } from "../../../BL/statusDA.impl";

export class StatusRouter {
  static get routes(): Router {
    const statusRepository = new StatusSourceImpl();
    const statusService = new StatusService(statusRepository);
    const statusController = new StatusController(statusService);

    const router = Router();
    router.get("/", statusController.getAllList);

    return router;
  }
}
