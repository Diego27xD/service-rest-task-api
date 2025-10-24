import { CategorySourceImpl } from "../DA/datasource/categoryDA.impl";
import { PrioritySourceImpl } from "../DA/datasource/priorityDA.impl";
import { StatusSourceImpl } from "../DA/datasource/statusDA.impl";
import { UserSourceImpl } from "../DA/datasource/userDA.impl";
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
    try {
      const task = await this.taskRepository.getById(id);
      if (!task) {
        throw TypeError.notFound(`No se encontró la tarea con ID ${id}.`);
      }

      return task;
    } catch (error) {
      throw error;
    }
  }

  async createTask(model: TaskCreateDTO): Promise<TaskDTO> {
    try {
      if (!model.titulo || model.titulo.trim().length === 0) {
        throw TypeError.conflict("El campo 'titulo' es obligatorio.");
      }

      if (!model.IdUsuario) {
        throw TypeError.conflict(
          "Debe especificar el usuario que crea la tarea."
        );
      }

      if (!model.IdPrioridad) {
        throw TypeError.conflict("Debe especificar la prioridad de la tarea.");
      }

      if (!model.IdCategoria) {
        throw TypeError.conflict("Debe especificar la categoría de la tarea.");
      }

      if (model.IdCategoria && model.IdCategoria <= 0) {
        throw TypeError.conflict(
          "El campo categoría debe ser un número válido."
        );
      }

      if (model.IdPrioridad && model.IdPrioridad <= 0) {
        throw TypeError.conflict(
          "El campo prioridad debe ser un número válido."
        );
      }

      if (!model.descripcion) {
        throw TypeError.conflict(
          "Es necesario especificar una breve descripción"
        );
      }
      const objPrioridad = new PrioritySourceImpl();
      const objCategory = new CategorySourceImpl();
      const objUsuario = new UserSourceImpl();

      const existPrioridad = await objPrioridad.getById(model.IdPrioridad);
      if (!existPrioridad)
        throw TypeError.conflict("La prioridad indicada no existe.");

      const existCategory = await objCategory.getById(model.IdCategoria);
      if (!existCategory)
        throw TypeError.conflict("La categoría indicada no existe.");
      const existUser = await objUsuario.getById(model.IdUsuario);
      if (!existUser)
        throw TypeError.conflict("El usuario indicado no existe.");

      const newTask = await this.taskRepository.create({
        ...model,
        IdStatus: 1,
      });
      return newTask;
    } catch (error) {
      throw error;
    }
  }

  async updateTask(id: number, model: TaskUpdateDTO): Promise<TaskDTO> {
    try {
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

      if (!model.titulo) {
        throw TypeError.conflict("Es necesario especificar el título");
      }

      if (!model.descripcion) {
        throw TypeError.conflict(
          "Es necesario especificar una breve descripción"
        );
      }

      if (!model.IdUsuario) {
        throw TypeError.conflict(
          "Debe especificar el usuario que crea la tarea."
        );
      }

      if (!model.IdPrioridad) {
        throw TypeError.conflict("Debe especificar la prioridad de la tarea.");
      }

      if (!model.IdCategoria) {
        throw TypeError.conflict("Debe especificar la categoría de la tarea.");
      }

      if (!model.IdStatus) {
        throw TypeError.conflict("Debe especificar la categoría de la tarea.");
      }

      const objPrioridad = new PrioritySourceImpl();
      const objCategory = new CategorySourceImpl();
      const objUsuario = new UserSourceImpl();
      const objEstado = new StatusSourceImpl();

      const existPrioridad = await objPrioridad.getById(model.IdPrioridad);
      if (!existPrioridad)
        throw TypeError.conflict("La prioridad indicada no existe.");

      const existCategory = await objCategory.getById(model.IdCategoria);
      if (!existCategory)
        throw TypeError.conflict("La categoría indicada no existe.");
      const existUser = await objUsuario.getById(model.IdUsuario);
      if (!existUser)
        throw TypeError.conflict("El usuario indicado no existe.");

      const existState = await objEstado.getById(model.IdStatus);
      if (!existState)
        throw TypeError.conflict("El estado indicado no existe.");

      const updated = await this.taskRepository.updateById(id, model);
      if (!updated) {
        throw TypeError.notFound(
          `No se pudo actualizar la tarea con ID ${id}.`
        );
      }

      return updated;
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(id: number): Promise<TaskDTO> {
    try {
      if (!id || id <= 0) {
        throw TypeError.conflict(
          "Debe proporcionar un ID válido para eliminar una tarea."
        );
      }

      const deleted = await this.taskRepository.deleteById(id);
      if (!deleted) {
        TypeError.notFound(
          `No se encontró la tarea con ID ${id} para eliminar.`
        );
      }

      return deleted;
    } catch (error) {
      throw error;
    }
  }
}
