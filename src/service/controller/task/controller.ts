import { Request, Response } from "express";
import { TaskService } from "../../../BL/taskBL";
import { CustomResponse } from "../../../UTIL/response/success.response";
import { CustomError } from "../../../UTIL/response/error.response";
import { TaskCreateDTO } from "../../../DTO/task.create.dto";
import { TaskUpdateDTO } from "../../../DTO/task.update.dto";

export class TaskController {
  constructor(private taskService: TaskService) {}

  public getListTasks = (req: Request, res: Response) => {
    this.taskService
      .getAllTasks()
      .then((result) =>
        CustomResponse.responseSuccess(200, result, res, "Lista encontrada")
      )
      .catch((err) =>
        CustomError.responseError(err, res, "Error al consultar data")
      );
  };

  public getListTasksByUser = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    this.taskService
      .getAllTasksByUser(id)
      .then((result) =>
        CustomResponse.responseSuccess(200, result, res, "Lista encontrada")
      )
      .catch((err) =>
        CustomError.responseError(err, res, "Error al consultar data")
      );
  };

  public getTaskById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return CustomError.responseError(
        new Error("El ID proporcionado no es válido."),
        res,
        "Error en los parámetros"
      );
    }

    this.taskService
      .getTaskById(id)
      .then((result) =>
        CustomResponse.responseSuccess(200, result, res, "Tarea encontrada")
      )
      .catch((err) =>
        CustomError.responseError(err, res, "Error al consultar la tarea")
      );
  };

  public createTask = (req: Request, res: Response) => {
    const body: TaskCreateDTO = req.body;

    this.taskService
      .createTask(body)
      .then((result) =>
        CustomResponse.responseSuccess(
          201,
          result,
          res,
          "Tarea creada exitosamente"
        )
      )
      .catch((err) =>
        CustomError.responseError(err, res, "Error al crear la tarea")
      );
  };

  public updateTask = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const body: TaskUpdateDTO = req.body;

    if (isNaN(id) || id <= 0) {
      return CustomError.responseError(
        new Error("El ID de la tarea no es válido."),
        res,
        "Error en los parámetros"
      );
    }

    this.taskService
      .updateTask(id, body)
      .then((result) =>
        CustomResponse.responseSuccess(
          200,
          result,
          res,
          "Tarea actualizada correctamente"
        )
      )
      .catch((err) =>
        CustomError.responseError(err, res, "Error al actualizar la tarea")
      );
  };

  public deleteTask = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return CustomError.responseError(
        new Error("El ID de la tarea no es válido."),
        res,
        "Error en los parámetros"
      );
    }

    this.taskService
      .deleteTask(id)
      .then((result) =>
        CustomResponse.responseSuccess(
          200,
          result,
          res,
          "Tarea eliminada correctamente"
        )
      )
      .catch((err) =>
        CustomError.responseError(err, res, "Error al eliminar la tarea")
      );
  };
}
