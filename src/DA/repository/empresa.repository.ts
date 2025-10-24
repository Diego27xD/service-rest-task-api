export abstract class RepositoryDA<T> {
  //? CONVERTIR A GENÉRICO
  abstract getAll(): Promise<T[]>;
  abstract create(modelCreateDto: any): Promise<T>;
  abstract getById(id: number): Promise<T>;
  abstract updateById(): Promise<T>;
  abstract deleteById(id: number): Promise<T>;
}
