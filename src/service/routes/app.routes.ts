import { Router } from "express";
import { TaskRouter, UserRouter } from "../controller";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/task", TaskRouter.routes);
    router.use("/api/v1/user", UserRouter.routes);

    return router;
  }
}
