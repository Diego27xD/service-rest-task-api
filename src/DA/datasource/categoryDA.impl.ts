import { prisma } from "../../config/envs";
import { CategoryDTO } from "../../DTO/category.dto";
import { CategoryRepository } from "../repository/category.repository";

export class CategorySourceImpl implements CategoryRepository<CategoryDTO> {
  async getById(id: number): Promise<CategoryDTO | null> {
    try {
      const result = await prisma.tSK_CATEGORY.findFirst({
        where: { ctg_idcategory: id },
      });
      if (!result) return null;
      return {
        IdCategoria: result?.ctg_idcategory,
        descripcion: result?.ctg_description,
        color: result.ctg_color,
      };
    } catch (error) {
      throw error;
    }
  }
  async getAll(): Promise<CategoryDTO[]> {
    try {
      const result = await prisma.tSK_CATEGORY.findMany();

      return result.map((item) => {
        return {
          IdCategoria: item.ctg_idcategory,
          descripcion: item.ctg_description,
          color: item.ctg_color,
        };
      });
    } catch (error) {
      throw error;
    }
  }
}
