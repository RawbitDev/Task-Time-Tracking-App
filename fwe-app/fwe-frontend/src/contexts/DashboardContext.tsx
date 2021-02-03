import React from 'react';
import { Label, Task } from '../util/EntityInterfaces';
import { FilterContainer } from '../util/FilterContainer';

const typedTasks: Task[] = [];
const typedLabels: Label[] = [];
const typedStrings: string[] = [];

const typedFilterContainer: FilterContainer = {
  description: '',
  labels: typedStrings,
  name: '',
};

export const DashboardContext = React.createContext({
  // tslint:disable: no-empty
  allLabels: typedLabels,
  cleanLabelsOption: () => {},
  filterDialog: false,
  filters: typedFilterContainer,
  labelNames: typedStrings,
  refetchLabels: () => {},
  refetchTasks: () => {},
  tasks: typedTasks,
  toggleFilterDialog: () => {},
  updateFilter: (newFilters: FilterContainer) => {},
});
