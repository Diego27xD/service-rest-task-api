export class LocalDTO {
  constructor(public IdLocal: number, public nombreLocal: string) {}

  public static fromObject(object: { [key: string]: any }): LocalDTO {
    const { IdLocal, nombreLocal } = object;

    // PODEMOS AGREGAR VALIDACIONES
    return new LocalDTO(IdLocal, nombreLocal);
  }
}
