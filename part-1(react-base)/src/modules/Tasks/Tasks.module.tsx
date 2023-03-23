import { TasksStats, TasksList, SearchForm } from './components';
import { TasksMock, TasksStatsMock } from '__mocks__/index';

export function Tasks() {
  return (
    <>
      <SearchForm />
      <TasksStats {...TasksStatsMock} />
      <TasksList tasks={TasksMock} />
    </>
  );
}
