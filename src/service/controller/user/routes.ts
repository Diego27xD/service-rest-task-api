import { Router } from "express";
import { UserSourceImpl } from "../../../DA/datasource/userDA.impl";
import { UserService } from "../../../BL/userBL";
import { UserController } from "./controller";

export class UserRouter {
  static get routes(): Router {
    const userRepository = new UserSourceImpl();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    const router = Router();
    router.post("/login", userController.authLogin);
    router.post("/register", userController.authRegister);

    return router;
  }
}
