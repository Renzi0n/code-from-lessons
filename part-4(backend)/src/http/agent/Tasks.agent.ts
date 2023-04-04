import { BasicAgent } from './Basic.agent';
import { GetAllTasksResponse, GetAllTasksQuery, UpdateTaskResponse, UpdateTaskRequest } from 'http/model';

class TasksAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  async getAllTasks(params?: GetAllTasksQuery): Promise<GetAllTasksResponse> {
    const { data } = await this._http.get<GetAllTasksResponse>(`/tasks`, {
      params,
    });

    return data;
  }

  async updateTask(taskId: string, newData: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const { data } = await this._http.patch<UpdateTaskResponse>(`/tasks/${taskId}`, newData);

    return data;
  }

  async deleteTask(taskId: string): Promise<void> {
    await this._http.delete(`/tasks/${taskId}`);
  }
}

export const TaskAgentInstance = new TasksAgent();
