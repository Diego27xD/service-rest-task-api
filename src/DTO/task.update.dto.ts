import { TaskCreateDTO } from "./task.create.dto";

export interface TaskUpdateDTO extends Partial<TaskCreateDTO> {}
