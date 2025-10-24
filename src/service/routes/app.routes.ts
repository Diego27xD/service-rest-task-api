import { Router } from "express";
import {
  CategoryRouter,
  PriorityRouter,
  StatusRouter,
  TaskRouter,
  UserRouter,
} from "../controller";
import { AuthMiddleware } from "../../middleware/auth.middleware";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use(
      "/api/v1/tasks",
      [AuthMiddleware.ValidateJWT],
      TaskRouter.routes
    );
    router.use("/api/v1/user", UserRouter.routes);

    router.use(
      "/api/v1/category",
      [AuthMiddleware.ValidateJWT],
      CategoryRouter.routes
    );
    router.use(
      "/api/v1/priority",
      [AuthMiddleware.ValidateJWT],
      PriorityRouter.routes
    );
    router.use(
      "/api/v1/status",
      [AuthMiddleware.ValidateJWT],
      StatusRouter.routes
    );
    return router;
  }
}
