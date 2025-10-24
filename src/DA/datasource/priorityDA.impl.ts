import { prisma } from "../../config/envs";
import { PriorityDTO } from "../../DTO/priority.dto";
import { PriorityRepository } from "../repository/priority.repository";

export class PrioritySourceImpl implements PriorityRepository<PriorityDTO> {
  async getById(id: number): Promise<PriorityDTO | null> {
    try {
      const result = await prisma.tSK_PRIORITY.findFirst({
        where: { prt_idpriority: id },
      });
      if (!result) return null;
      return {
        IdPrioridad: result?.prt_idpriority,
        descripcion: result?.prt_description,
      };
    } catch (error) {
      throw error;
    }
  }
  async getAll(): Promise<PriorityDTO[]> {
    try {
      const result = await prisma.tSK_PRIORITY.findMany();

      return result.map((item) => {
        return {
          IdPrioridad: item.prt_idpriority,
          descripcion: item.prt_description,
        };
      });
    } catch (error) {
      throw error;
    }
  }
}
