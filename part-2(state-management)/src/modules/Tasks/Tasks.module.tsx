import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { TasksStats, TasksList, SearchForm } from './components';
import { TasksStoreInstance } from './store';

function TasksProto() {
  useEffect(() => {
    TasksStoreInstance.loadTasks();
  }, []);

  return (
    <>
      <SearchForm />
      <TasksStats />
      <TasksList />
    </>
  );
}

export const Tasks = observer(TasksProto);
