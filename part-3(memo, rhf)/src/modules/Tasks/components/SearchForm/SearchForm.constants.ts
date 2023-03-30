import { FILTER_TYPES } from 'constants/statusFilterTypes';
import { SearchFormEntity } from 'domains/index';

export const DEFAULT_SEARCH_FORM: SearchFormEntity = {
  searchValue: '',
  filterType: FILTER_TYPES.ALL,
};
