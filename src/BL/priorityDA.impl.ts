import { PriorityRepository } from "../DA/repository/priority.repository";
import { PriorityDTO } from "../DTO/priority.dto";

export class PriorityService {
  constructor(
    private readonly priorityRepository: PriorityRepository<PriorityDTO>
  ) {}

  async getAll() {
    try {
      return await this.priorityRepository.getAll();
    } catch (error) {
      throw error;
    }
  }
}
