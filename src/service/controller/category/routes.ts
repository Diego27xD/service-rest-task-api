import { Router } from "express";
import { CategoryController } from "./controller";
import { CategorySourceImpl } from "../../../DA/datasource/categoryDA.impl";
import { CategoryService } from "../../../BL/categoryDA.impl";

export class CategoryRouter {
  static get routes(): Router {
    const categoryRepository = new CategorySourceImpl();
    const categoryService = new CategoryService(categoryRepository);
    const categoryController = new CategoryController(categoryService);

    const router = Router();
    router.get("/", categoryController.getAllList);

    return router;
  }
}
