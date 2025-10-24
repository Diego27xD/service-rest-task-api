export abstract class StatusRepository<T> {
  abstract getById(id: number): Promise<T | null>;
  abstract getAll(): Promise<T[]>;
}
