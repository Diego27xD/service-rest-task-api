export interface TaskCreateDTO {
  titulo: string;
  descripcion: string;
  fechaTermino?: Date;
  IdUsuario: number;
  IdCategoria: number;
  IdStatus: number;
  IdPrioridad: number;
}
