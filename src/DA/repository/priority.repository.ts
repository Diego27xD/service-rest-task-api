export abstract class PriorityRepository<T> {
  abstract getById(id: number): Promise<T | null>;
  abstract getAll(): Promise<T[]>;
}
