import { UserCreateDTO } from "../../DTO/user.create.dto";

export abstract class CategoryRepository<T> {
  abstract getById(id: number): Promise<T | null>;
  abstract getAll(): Promise<T[]>;
}
