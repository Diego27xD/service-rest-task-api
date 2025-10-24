import { CategoryRepository } from "../DA/repository/category.repository";
import { CategoryDTO } from "../DTO/category.dto";

export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository<CategoryDTO>
  ) {}

  async getAll() {
    try {
      return await this.categoryRepository.getAll();
    } catch (error) {
      throw error;
    }
  }
}
