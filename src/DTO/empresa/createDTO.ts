export class EmpresaCreateDto {
  private constructor(public readonly nombreEmpresa: string) {}
  static create(props: { [key: string]: any }): [string?, EmpresaCreateDto?] {
    const { nombreEmpresa } = props;

    if (!nombreEmpresa) return ["Es necesario ingresar el nombre de empresa"];

    return [undefined, new EmpresaCreateDto(nombreEmpresa)];
  }
}
