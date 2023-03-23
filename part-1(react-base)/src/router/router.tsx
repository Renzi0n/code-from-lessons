import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TasksPage } from 'pages/index';
import { PATH_LIST } from 'constants/paths';

export function Router() {
  return (
    <Routes>
      <Route path={PATH_LIST.ROOT} element={<TasksPage />} />
      <Route path={PATH_LIST.EDIT} element={<div />} />
      <Route path={PATH_LIST.ADD} element={<div />} />
    </Routes>
  );
}
