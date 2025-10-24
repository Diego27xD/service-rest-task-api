import { JWT_TOKEN_KEY } from "../config/envs";
import { UserRepository } from "../DA/repository/user.repository";
import { UserCreateDTO } from "../DTO/user.create.dto";
import { UserDTO } from "../DTO/user.dto";
import { UserLoginDTO } from "../DTO/user.login.dto";
import { JWTUtil } from "../UTIL/JWT.util";
import { TypeError } from "../UTIL/response/typeErrors";
import bcrypt from "bcrypt";

export class UserService {
  constructor(private readonly userRepository: UserRepository<UserDTO>) {}

  async authLogin(data: UserLoginDTO) {
    try {
      if (!data.usuario || !data.password) {
        throw TypeError.conflict("Se requiere usuario y contraseña");
      }

      const user = await this.userRepository.getByUser(data.usuario);
      if (!user) {
        throw TypeError.notFound("Usuario no encontrado");
      }

      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password!
      );
      if (!isPasswordValid) {
        throw TypeError.unauthorized("Contraseña incorrecta");
      }

      const objJWT = new JWTUtil(JWT_TOKEN_KEY.ACCESS);
      const tokenAccess = await objJWT.generateToken(
        { user: user.IdUsuario },
        "6h"
      );

      return {
        tokenAccess,
        usuario: user.usuario,
        nombreCompleto: user.nombreCompleto,
        IdUser: user.IdUsuario,
      };
    } catch (error) {
      throw error;
    }
  }

  async authRegister(data: UserCreateDTO) {
    try {
      if (!data.nombreCompleto || !data.usuario || !data.password) {
        throw TypeError.conflict(
          "La data enviada es insuficiente, se necesita: nombreCompleto, usuario, password"
        );
      }

      const existingUser = await this.userRepository.getByUser(data.usuario);
      if (existingUser) {
        throw TypeError.conflict("El usuario ya existe");
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      const newUser = await this.userRepository.create({
        nombreCompleto: data.nombreCompleto,
        usuario: data.usuario,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async validAuth(IdUser: number) {
    try {
      const user = await this.userRepository.getById(IdUser);
      if (!user) throw TypeError.notFound("Lo siento, el usuario no existe.");
      const objJWT = new JWTUtil(JWT_TOKEN_KEY.ACCESS);
      const tokenAccess = await objJWT.generateToken(
        { user: user.IdUsuario },
        "6h"
      );
      return {
        tokenAccess,
        usuario: user.usuario,
        nombreCompleto: user.nombreCompleto,
        IdUser: user.IdUsuario,
      };
    } catch (error) {}
  }
}
