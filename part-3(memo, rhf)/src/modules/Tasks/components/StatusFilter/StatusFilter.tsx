import React, { memo, MouseEvent } from 'react';
import { CLASSNAMES } from './StatusFilter.constants';
import { StatusFilterProps } from './StatusFilter.types';
import { FiltersType } from 'domains/index';
import { FILTER_TYPES } from 'constants/index';

function StatusFilterProto({ onChange, tasksType, disabled }: StatusFilterProps) {
  const onFilterChange = (evt: MouseEvent<HTMLDivElement> & { target: HTMLButtonElement }) => {
    if (!disabled) onChange(evt.target.textContent as FiltersType);
  };

  return (
    <div className="btn-group" onClick={onFilterChange}>
      <button type="button" className={tasksType === FILTER_TYPES.ALL ? CLASSNAMES.ACTIVE : CLASSNAMES.SECONDARY}>
        {FILTER_TYPES.ALL}
      </button>
      <button type="button" className={tasksType === FILTER_TYPES.ACTIVE ? CLASSNAMES.ACTIVE : CLASSNAMES.SECONDARY}>
        {FILTER_TYPES.ACTIVE}
      </button>
      <button type="button" className={tasksType === FILTER_TYPES.DONE ? CLASSNAMES.ACTIVE : CLASSNAMES.SECONDARY}>
        {FILTER_TYPES.DONE}
      </button>
      <button type="button" className={tasksType === FILTER_TYPES.IMPORTANT ? CLASSNAMES.ACTIVE : CLASSNAMES.SECONDARY}>
        {FILTER_TYPES.IMPORTANT}
      </button>
    </div>
  );
}

export const StatusFilter = memo(StatusFilterProto);
