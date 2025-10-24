import { UserCreateDTO } from "../../DTO/user.create.dto";

export abstract class UserRepository<T> {
  abstract getByUser(user: string): Promise<T | null>;
  abstract create(modelCreateDto: UserCreateDTO): Promise<T>;
}
