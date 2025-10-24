import { format } from "date-fns";
import { prisma } from "../../config/envs";
import { TaskCreateDTO } from "../../DTO/task.create.dto";
import { TaskDTO } from "../../DTO/task.dto";
import { TaskUpdateDTO } from "../../DTO/task.update.dto";
import { TaskRepository } from "../repository/task.repository";

export class TaskSourceImpl implements TaskRepository<TaskDTO> {
  async getByUser(IdUser: number): Promise<TaskDTO[]> {
    try {
      const result = await prisma.tSK_TASK.findMany({
        where: {
          tsk_userId: IdUser,
        },
        select: {
          tsk_idtask: true,
          tsk_title: true,
          tsk_description: true,
          tsk_duedate: true,
          tsk_createdAt: true,
          tsk_updatedAt: true,
          tsk_user: { select: { usr_fullname: true } },
          tsk_category: { select: { ctg_description: true } },
          tsk_status: { select: { stt_description: true } },
          tsk_priority: { select: { prt_description: true } },
        },
        orderBy: [{ tsk_statusId: "asc" }, { tsk_createdAt: "desc" }],
      });

      return result.map((item) => {
        return {
          IdTarea: item.tsk_idtask,
          descripcion: item.tsk_description!,
          fechaTermino:
            item.tsk_status.stt_description == "Completado"
              ? format(item.tsk_updatedAt, "yyyy-MM-dd")
              : "",
          fechaCreacion: item.tsk_createdAt,
          titulo: item.tsk_title,
          nombreUsuario: item.tsk_user.usr_fullname,
          estatus: item.tsk_status.stt_description,
          nombreCategoria: item.tsk_category.ctg_description,
          prioridad: item.tsk_priority.prt_description,
        };
      });
    } catch (error) {
      throw error;
    }
  }
  async getAll(): Promise<TaskDTO[]> {
    try {
      const result = await prisma.tSK_TASK.findMany({
        select: {
          tsk_idtask: true,
          tsk_title: true,
          tsk_description: true,
          tsk_duedate: true,
          tsk_createdAt: true,
          tsk_updatedAt: true,
          tsk_user: { select: { usr_fullname: true } },
          tsk_category: { select: { ctg_description: true } },
          tsk_status: { select: { stt_description: true } },
          tsk_priority: { select: { prt_description: true } },
        },
        orderBy: [{ tsk_statusId: "asc" }, { tsk_createdAt: "desc" }],
      });

      return result.map((item) => {
        return {
          IdTarea: item.tsk_idtask,
          descripcion: item.tsk_description!,
          fechaTermino:
            item.tsk_status.stt_description == "Completado"
              ? format(item.tsk_updatedAt, "yyyy-MM-dd")
              : "",
          fechaCreacion: item.tsk_createdAt,
          titulo: item.tsk_title,
          nombreUsuario: item.tsk_user.usr_fullname,
          estatus: item.tsk_status.stt_description,
          nombreCategoria: item.tsk_category.ctg_description,
          prioridad: item.tsk_priority.prt_description,
        };
      });
    } catch (error) {
      throw error;
    }
  }
  async create(modelCreateDto: TaskCreateDTO): Promise<TaskDTO> {
    try {
      const result = await prisma.tSK_TASK.create({
        data: {
          tsk_title: modelCreateDto.titulo,
          tsk_description: modelCreateDto.descripcion,
          tsk_categoryId: modelCreateDto.IdCategoria,
          tsk_priorityId: modelCreateDto.IdPrioridad,
          tsk_statusId: modelCreateDto.IdStatus,
          tsk_userId: modelCreateDto.IdUsuario,
        },
        select: {
          tsk_idtask: true,
          tsk_title: true,
          tsk_description: true,
          tsk_createdAt: true,
          tsk_updatedAt: true,
          tsk_user: { select: { usr_fullname: true } },
          tsk_category: { select: { ctg_description: true } },
          tsk_status: { select: { stt_description: true } },
          tsk_priority: { select: { prt_description: true } },
        },
      });

      return {
        IdTarea: result.tsk_idtask,
        descripcion: result.tsk_description!,
        fechaCreacion: result.tsk_createdAt,
        titulo: result.tsk_title,
        nombreUsuario: result.tsk_user.usr_fullname,
        estatus: result.tsk_status.stt_description,
        nombreCategoria: result.tsk_category.ctg_description,
        prioridad: result.tsk_priority.prt_description,
        fechaTermino:
          result.tsk_status.stt_description == "Completado"
            ? format(result.tsk_updatedAt, "yyyy-MM-dd")
            : "",
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getById(id: number): Promise<TaskDTO> {
    try {
      const result = await prisma.tSK_TASK.findUnique({
        where: { tsk_idtask: id },
        select: {
          tsk_idtask: true,
          tsk_title: true,
          tsk_description: true,
          tsk_duedate: true,
          tsk_updatedAt: true,
          tsk_createdAt: true,
          tsk_user: { select: { usr_fullname: true } },
          tsk_category: { select: { ctg_description: true } },
          tsk_status: { select: { stt_description: true } },
          tsk_priority: { select: { prt_description: true } },
        },
      });

      if (!result) throw new Error(`La tarea con ID ${id} no existe.`);

      return {
        IdTarea: result.tsk_idtask,
        descripcion: result.tsk_description!,
        fechaTermino:
          result.tsk_status.stt_description == "Completado"
            ? format(result.tsk_updatedAt, "yyyy-MM-dd")
            : "",
        fechaCreacion: result.tsk_createdAt,
        titulo: result.tsk_title,
        nombreUsuario: result.tsk_user.usr_fullname,
        estatus: result.tsk_status.stt_description,
        nombreCategoria: result.tsk_category.ctg_description,
        prioridad: result.tsk_priority.prt_description,
      };
    } catch (error) {
      throw error;
    }
  }
  async updateById(
    id: number,
    modelUpdateDto: TaskUpdateDTO
  ): Promise<TaskDTO> {
    try {
      const result = await prisma.tSK_TASK.update({
        where: { tsk_idtask: id },
        data: {
          tsk_title: modelUpdateDto.titulo,
          tsk_description: modelUpdateDto.descripcion,
          tsk_categoryId: modelUpdateDto.IdCategoria,
          tsk_priorityId: modelUpdateDto.IdPrioridad,
          tsk_statusId: modelUpdateDto.IdStatus,
          tsk_userId: modelUpdateDto.IdUsuario,
          tsk_updatedAt: new Date(),
        },
        select: {
          tsk_idtask: true,
          tsk_title: true,
          tsk_description: true,
          tsk_duedate: true,
          tsk_createdAt: true,
          tsk_updatedAt: true,
          tsk_user: { select: { usr_fullname: true } },
          tsk_category: { select: { ctg_description: true } },
          tsk_status: { select: { stt_description: true } },
          tsk_priority: { select: { prt_description: true } },
        },
      });

      return {
        IdTarea: result.tsk_idtask,
        descripcion: result.tsk_description!,
        fechaTermino:
          result.tsk_status.stt_description == "Completado"
            ? format(result.tsk_updatedAt, "yyyy-MM-dd")
            : "",
        fechaCreacion: result.tsk_createdAt,
        titulo: result.tsk_title,
        nombreUsuario: result.tsk_user.usr_fullname,
        estatus: result.tsk_status.stt_description,
        nombreCategoria: result.tsk_category.ctg_description,
        prioridad: result.tsk_priority.prt_description,
      };
    } catch (error) {
      throw error;
    }
  }
  async deleteById(id: number): Promise<TaskDTO> {
    try {
      const result = await prisma.tSK_TASK.delete({
        where: { tsk_idtask: id },
        select: {
          tsk_idtask: true,
          tsk_title: true,
          tsk_description: true,
          tsk_duedate: true,
          tsk_createdAt: true,
          tsk_updatedAt: true,
          tsk_user: { select: { usr_fullname: true } },
          tsk_category: { select: { ctg_description: true } },
          tsk_status: { select: { stt_description: true } },
          tsk_priority: { select: { prt_description: true } },
        },
      });

      return {
        IdTarea: result.tsk_idtask,
        descripcion: result.tsk_description!,
        fechaTermino:
          result.tsk_status.stt_description == "Completado"
            ? format(result.tsk_updatedAt, "yyyy-MM-dd")
            : "",
        fechaCreacion: result.tsk_createdAt,
        titulo: result.tsk_title,
        nombreUsuario: result.tsk_user.usr_fullname,
        estatus: result.tsk_status.stt_description,
        nombreCategoria: result.tsk_category.ctg_description,
        prioridad: result.tsk_priority.prt_description,
      };
    } catch (error) {
      throw error;
    }
  }
}
