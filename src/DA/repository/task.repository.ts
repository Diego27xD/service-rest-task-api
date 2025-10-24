import { TaskCreateDTO } from "../../DTO/task.create.dto";
import { TaskUpdateDTO } from "../../DTO/task.update.dto";
export abstract class TaskRepository<T> {
  abstract getAll(): Promise<T[]>;
  abstract create(modelCreateDto: TaskCreateDTO): Promise<T>;
  abstract getById(id: number): Promise<T>;
  abstract updateById(id: number, modelUpdateDto: TaskUpdateDTO): Promise<T>;
  abstract deleteById(id: number): Promise<T>;
  abstract getByUser(IdUser: number): Promise<T[]>;
}
