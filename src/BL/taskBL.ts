import { TaskRepository } from "../DA/repository/task.repository";
import { TaskCreateDTO } from "../DTO/task.create.dto";
import { TaskDTO } from "../DTO/task.dto";
import { TaskUpdateDTO } from "../DTO/task.update.dto";
import { TypeError } from "../UTIL/response/typeErrors";

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository<TaskDTO>) {}
  async getAllTasks() {
    return await this.taskRepository.getAll();
  }

  async getAllTasksByUser(IdUser: number) {
    return await this.taskRepository.getByUser(IdUser);
  }

  async getTaskById(id: number): Promise<TaskDTO> {
    const task = await this.taskRepository.getById(id);
    if (!task) {
      throw TypeError.notFound(`No se encontró la tarea con ID ${id}.`);
    }

    return task;
  }

  async createTask(model: TaskCreateDTO): Promise<TaskDTO> {
    if (!model.titulo || model.titulo.trim().length === 0) {
      throw TypeError.conflict("El campo 'titulo' es obligatorio.");
    }

    if (!model.IdUsuario) {
      throw TypeError.conflict(
        "Debe especificar el usuario que crea la tarea (IdUsuario)."
      );
    }

    if (model.IdStatus && model.IdStatus <= 0) {
      throw TypeError.conflict(
        "El campo 'IdStatus' debe ser un número válido."
      );
    }

    if (model.IdCategoria && model.IdCategoria <= 0) {
      throw TypeError.conflict(
        "El campo 'IdCategoria' debe ser un número válido."
      );
    }

    if (model.IdPrioridad && model.IdPrioridad <= 0) {
      throw TypeError.conflict(
        "El campo 'IdPrioridad' debe ser un número válido."
      );
    }

    const newTask = await this.taskRepository.create(model);
    return newTask;
  }

  async updateTask(id: number, model: TaskUpdateDTO): Promise<TaskDTO> {
    if (model.titulo && model.titulo.trim().length === 0) {
      throw TypeError.conflict("El título no puede estar vacío.");
    }

    if (model.IdStatus && model.IdStatus <= 0) {
      throw TypeError.conflict("El ID del estatus debe ser válido.");
    }

    if (model.IdCategoria && model.IdCategoria <= 0) {
      throw TypeError.conflict("El ID de la categoría debe ser válido.");
    }

    if (model.IdPrioridad && model.IdPrioridad <= 0) {
      throw TypeError.conflict("El ID de la prioridad debe ser válido.");
    }

    const updated = await this.taskRepository.updateById(id, model);
    if (!updated) {
      throw TypeError.notFound(`No se pudo actualizar la tarea con ID ${id}.`);
    }

    return updated;
  }

  async deleteTask(id: number): Promise<TaskDTO> {
    if (!id || id <= 0) {
      throw TypeError.conflict(
        "Debe proporcionar un ID válido para eliminar una tarea."
      );
    }

    const deleted = await this.taskRepository.deleteById(id);
    if (!deleted) {
      TypeError.notFound(`No se encontró la tarea con ID ${id} para eliminar.`);
    }

    return deleted;
  }
}
