import { prisma } from "../../config/envs";
import { StatusDTO } from "../../DTO/status.dto";
import { StatusRepository } from "../repository/status.repository";

export class StatusSourceImpl implements StatusRepository<StatusDTO> {
  async getById(id: number): Promise<StatusDTO | null> {
    try {
      const result = await prisma.tSK_STATUS.findFirst({
        where: { stt_idstatus: id },
      });
      if (!result) return null;
      return {
        IdEstado: result?.stt_idstatus,
        descripcion: result?.stt_description,
      };
    } catch (error) {
      throw error;
    }
  }
  async getAll(): Promise<StatusDTO[]> {
    try {
      const result = await prisma.tSK_STATUS.findMany();

      return result.map((item) => {
        return {
          IdEstado: item.stt_idstatus,
          descripcion: item.stt_description,
        };
      });
    } catch (error) {
      throw error;
    }
  }
}
