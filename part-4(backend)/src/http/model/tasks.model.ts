import { paths } from './todo.swagger';

export type GetAllTasksQuery = paths['/tasks']['get']['parameters']['query'];
export type GetAllTasksResponse = paths['/tasks']['get']['responses']['200']['content']['application/json'];

export type GetTaskResponse = paths['/tasks/{taskId}']['get']['responses']['200']['content']['application/json'];

export type UpdateTaskRequest = paths['/tasks/{taskId}']['patch']['requestBody']['content']['application/json'];
export type UpdateTaskResponse = paths['/tasks/{taskId}']['patch']['responses']['200']['content']['application/json'];
