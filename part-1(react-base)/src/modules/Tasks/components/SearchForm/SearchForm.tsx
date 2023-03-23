import React, { useState, MouseEvent } from 'react';
import { StatusFilter } from '../StatusFilter';
import { SearchInput } from 'components/index';
import { FILTER_TYPES } from 'constants/index';
import { FiltersType } from 'domains/index';
import './SearchForm.css';

export function SearchForm() {
  const [filterType, setFilterType] = useState<FiltersType>(FILTER_TYPES.ALL);
  const [searchValue, setSearchValue] = useState<string>('');

  const onSearchInputChange = (value: string) => {
    setSearchValue(value);
  };

  const onFilterChange = (type: FiltersType) => {
    setFilterType(type);
  };

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setSearchValue('');
    setFilterType(FILTER_TYPES.ALL);
    console.log('search:', filterType, searchValue);
  };

  return (
    <form className="search-form d-flex justify-content-between">
      <SearchInput value={searchValue} onChange={onSearchInputChange} />
      <StatusFilter tasksType={filterType} onChange={onFilterChange} />
      <button type="submit" className="btn btn-primary" onClick={onSubmit}>
        Find
      </button>
    </form>
  );
}
