import { FiltersType } from 'domains/index';

export interface StatusFilterProps {
  tasksType: FiltersType;
  // eslint-disable-next-line no-unused-vars
  onChange: (tasksType: FiltersType) => void;
  disabled?: boolean;
}
