export interface TaskDTO {
  IdTarea: number;
  titulo: string;
  descripcion: string;
  fechaTermino: Date;
  fechaCreacion: Date;
  nombreUsuario: string;
  nombreCategoria: string;
  estatus: string;
  prioridad: string;
}
