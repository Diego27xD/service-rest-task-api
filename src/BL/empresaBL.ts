import { RepositoryDA } from "../DA/repository/empresa.repository";
import { EmpresaCreateDto } from "../DTO/empresa/createDTO";
import { EmpresaDTO } from "../DTO/empresa/empresaDTO";

export class EmpresaService {
  constructor(private readonly empresaRepository: RepositoryDA<EmpresaDTO>) {}
  async obtenerTotalEmpresas() {
    return await this.empresaRepository.getAll();
  }

  async crearEmpresa(empresaCreateDto: EmpresaCreateDto) {
    return await this.empresaRepository.create(empresaCreateDto);
  }
}
