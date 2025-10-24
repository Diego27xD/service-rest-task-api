import { Router } from "express";
import { TaskSourceImpl } from "../../../DA/datasource/taskDA.impl";
import { TaskService } from "../../../BL/taskBL";
import { TaskController } from "./controller";

export class TaskRouter {
  static get routes(): Router {
    const taskRepository = new TaskSourceImpl();
    const taskService = new TaskService(taskRepository);
    const taskController = new TaskController(taskService);

    const router = Router();
    router.get("/", taskController.getListTasks);
    router.get("/:id", taskController.getTaskById);

    router.post("/", taskController.createTask);
    router.put("/:id", taskController.updateTask);
    router.delete("/:id", taskController.deleteTask);

    return router;
  }
}
