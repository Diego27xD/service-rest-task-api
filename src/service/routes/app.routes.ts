import { Router } from "express";
import {
  CategoryRouter,
  PriorityRouter,
  StatusRouter,
  TaskRouter,
  UserRouter,
} from "../controller";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/tasks", TaskRouter.routes);
    router.use("/api/v1/user", UserRouter.routes);

    router.use("/api/v1/category", CategoryRouter.routes);
    router.use("/api/v1/priority", PriorityRouter.routes);
    router.use("/api/v1/status", StatusRouter.routes);
    return router;
  }
}
