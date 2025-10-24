import { StatusRepository } from "../DA/repository/status.repository";

import { StatusDTO } from "../DTO/status.dto";

export class StatusService {
  constructor(private readonly statusRepository: StatusRepository<StatusDTO>) {}

  async getAll() {
    try {
      return await this.statusRepository.getAll();
    } catch (error) {
      throw error;
    }
  }
}
