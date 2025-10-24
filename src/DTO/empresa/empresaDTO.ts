import { LocalDTO } from "../local/localDTO";

export class EmpresaDTO {
  constructor(
    public IdEmpresa: number,
    public nombreEmpresa: string,
    public locales: LocalDTO[]
  ) {}

  public static fromObject(object: { [key: string]: any }): EmpresaDTO {
    const { IdEmpresa, nombreEmpresa, local } = object;

    const dataLocal = local?.map(
      (local: { [key: string]: any }) =>
        new LocalDTO(local.IdLocal, local.nombreLocal)
    );

    // PODEMOS AGREGAR VALIDACIONES
    return new EmpresaDTO(IdEmpresa, nombreEmpresa, dataLocal);
  }
}
