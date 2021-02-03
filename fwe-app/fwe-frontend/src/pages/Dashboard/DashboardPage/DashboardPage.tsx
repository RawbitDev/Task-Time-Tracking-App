import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { Layout } from '../../../components/Layout/Layout';
import { DashboardContext } from '../../../contexts/DashboardContext';
import { Label, Task } from '../../../util/EntityInterfaces';
import { deleteLabels, fetchAllLabels, fetchAllTasks } from '../../../util/RequestHelper';
import { TaskList } from '../components/Task/TaskList/TaskList';
import { AddTaskDialog } from '../components/Task/AddTaskDialog/AddTaskDialog';
import { useSnackbar } from 'notistack';
import { FilterList } from '../components/Filter/FilterList/FilterList';
import { EditFilterDialog } from '../components/Filter/EditFilterDialog/EditFilterDialog';
import { FilterContainer } from '../../../util/FilterContainer';
import useLocalStorage from '../../../util/LocalStorageHook';

export const DashboardPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [taskList, setTaskList] = useLocalStorage<Task[]>('DashboardPage.taskList', []);
  const [labelList, setLabelList] = useLocalStorage<Label[]>('DashboardPage.labelList', []);
  const [labelNamesList, setLabelNamesList] = useLocalStorage<string[]>('DashboardPage.labelNamesList', []);
  const [filterDialogMode, setFilterDialog] = useLocalStorage<boolean>('DashboardPage.filterDialogMode', false);
  const [filterList, setFilterList] = useLocalStorage<FilterContainer>('DashboardPage.filterList', {
    description: '',
    labels: [],
    name: '',
  });

  const updateFilters = async (filters: FilterContainer) => {
    setFilterList(filters);
  };

  const toggleFilters = () => {
    setFilterDialog(!filterDialogMode);
  };

  const fetchTasks = async () => {
    let allTasks: Task[] = await fetchAllTasks();

    // Apply filters if set
    if (filterList.name) {
      allTasks = allTasks.filter((task) => task.name.toLowerCase().includes(filterList.name.toLowerCase()));
    }
    if (filterList.description) {
      allTasks = allTasks.filter((task) =>
        task.description.toLowerCase().includes(filterList.description.toLowerCase()),
      );
    }
    if (filterList.labels.length) {
      // Filter all tasks, that contain all set filter labels (not just one of them)
      allTasks = allTasks.filter(
        (task) =>
          task.labels.filter((label) => filterList.labels.includes(label.name)).length >= filterList.labels.length,
      );
    }

    setTaskList(allTasks);
  };

  const fetchLabels = async () => {
    const allLabels: Label[] = await fetchAllLabels();
    setLabelList(allLabels);
    const labelNames = allLabels.map((label: Label) => {
      return label.name;
    });
    setLabelNamesList(labelNames);
  };

  const clearUnusedLabels = async (forceMsg: boolean = false) => {
    const allLabels: Label[] = await fetchAllLabels();
    const labelsToRemove: Label[] = [];

    for (const label of allLabels) {
      if (label.tasks.length <= 0) {
        labelsToRemove.push(label);
      }
    }

    if (forceMsg || labelsToRemove.length > 0) {
      await deleteLabels(labelsToRemove);
      enqueueSnackbar(`Cleaned up ${labelsToRemove.length} unused labels!`, { variant: 'info' });
    }
  };

  const cleanLabels = async () => {
    await clearUnusedLabels(true);
    await fetchLabels();
  };

  const context = {
    allLabels: labelList,
    cleanLabelsOption: cleanLabels,
    filterDialog: filterDialogMode,
    filters: filterList,
    labelNames: labelNamesList,
    refetchLabels: fetchLabels,
    refetchTasks: fetchTasks,
    tasks: taskList,
    toggleFilterDialog: toggleFilters,
    updateFilter: updateFilters,
  };

  useEffect(() => {
    (async () => {
      await fetchTasks();
      await clearUnusedLabels();
      await fetchLabels();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await fetchTasks();
    })();
  }, [filterList]);

  return (
    <DashboardContext.Provider value={context}>
      <Layout title="Dashboard">
        <AddTaskDialog />
        <EditFilterDialog />
        {filterList.description || filterList.labels.length || filterList.name ? (
          <Container maxWidth="lg">
            <FilterList />
          </Container>
        ) : (
          ''
        )}
        <Container maxWidth="lg">
          <TaskList />
        </Container>
      </Layout>
    </DashboardContext.Provider>
  );
};
