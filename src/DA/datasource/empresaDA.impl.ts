import { EmpresaDTO } from "../../DTO/empresa/empresaDTO";
import { prisma } from "../../config/envs";
import { EmpresaCreateDto } from "../../DTO/empresa/createDTO";
import { RepositoryDA } from "../repository/empresa.repository";

export class EmpresaSourceImpl implements RepositoryDA<EmpresaDTO> {
  async create(empresaCreateDto: EmpresaCreateDto): Promise<EmpresaDTO> {
    try {
      const data = await prisma.empresa.create({
        data: empresaCreateDto!,
      });
      return EmpresaDTO.fromObject(data);
    } catch (error) {
      throw new Error("Error al consultar los datos");
    } finally {
      prisma.$disconnect();
    }
  }
  getById(id: number): Promise<EmpresaDTO> {
    throw new Error("Method not implemented.");
  }
  updateById(): Promise<EmpresaDTO> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: number): Promise<EmpresaDTO> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<EmpresaDTO[]> {
    const data = await prisma.empresa.findMany({
      select: {
        IdEmpresa: true,
        nombreEmpresa: true,
        local: {
          select: {
            IdLocal: true,
            nombreLocal: true,
          },
        },
      },
    });

    return data.map((item) => EmpresaDTO.fromObject(item));
  }
}
