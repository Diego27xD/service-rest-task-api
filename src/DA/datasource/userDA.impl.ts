import { prisma } from "../../config/envs";
import { UserCreateDTO } from "../../DTO/user.create.dto";
import { UserDTO } from "../../DTO/user.dto";
import { UserRepository } from "../repository/user.repository";

export class UserSourceImpl implements UserRepository<UserDTO> {
  async getById(id: number): Promise<UserDTO | null> {
    try {
      const result = await prisma.tSK_USER.findFirst({
        where: {
          usr_idusuario: id,
        },
      });
      if (!result) return null;

      return {
        IdUsuario: result?.usr_idusuario,
        nombreCompleto: result?.usr_fullname,
        usuario: result?.usr_user,
        password: result.usr_password,
      };
    } catch (error) {
      throw error;
    }
  }
  async getByUser(user: string): Promise<UserDTO | null> {
    try {
      const result = await prisma.tSK_USER.findFirst({
        where: {
          usr_user: user,
        },
      });
      if (!result) return null;

      return {
        IdUsuario: result?.usr_idusuario,
        nombreCompleto: result?.usr_fullname,
        usuario: result?.usr_user,
        password: result.usr_password,
      };
    } catch (error) {
      throw error;
    }
  }
  async create(modelCreateDto: UserCreateDTO): Promise<UserDTO> {
    try {
      const result = await prisma.tSK_USER.create({
        data: {
          usr_fullname: modelCreateDto.nombreCompleto,
          usr_password: modelCreateDto.password,
          usr_user: modelCreateDto.usuario,
        },
      });

      return {
        IdUsuario: result?.usr_idusuario,
        nombreCompleto: result?.usr_fullname,
        usuario: result?.usr_user,
      };
    } catch (error) {
      throw error;
    }
  }
}
