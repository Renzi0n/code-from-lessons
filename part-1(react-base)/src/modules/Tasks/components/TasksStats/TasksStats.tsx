import React from 'react';
import { TasksStatsProps } from './TasksStats.types';

export function TasksStats({ total, important, done }: TasksStatsProps) {
  return (
    <div className="d-flex w-100 justify-content-between">
      <p>
        Total: <span className="badge bg-secondary">{total}</span>
      </p>
      <p>
        Important: <span className="badge bg-secondary">{important}</span>
      </p>
      <p>
        Done: <span className="badge bg-secondary">{done}</span>
      </p>
    </div>
  );
}
