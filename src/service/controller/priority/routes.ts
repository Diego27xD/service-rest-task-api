import { Router } from "express";
import { PriorityController } from "./controller";

import { PrioritySourceImpl } from "../../../DA/datasource/priorityDA.impl";
import { PriorityService } from "../../../BL/priorityDA.impl";

export class PriorityRouter {
  static get routes(): Router {
    const priorityRepository = new PrioritySourceImpl();
    const priorityService = new PriorityService(priorityRepository);
    const priorityController = new PriorityController(priorityService);

    const router = Router();
    router.get("/", priorityController.getAllList);

    return router;
  }
}
