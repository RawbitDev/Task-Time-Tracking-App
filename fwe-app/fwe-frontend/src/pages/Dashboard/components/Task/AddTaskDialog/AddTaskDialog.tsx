// tslint:disable: no-submodule-imports
import { useSnackbar } from 'notistack';
import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { DashboardContext } from '../../../../../contexts/DashboardContext';
import { Task } from '../../../../../util/EntityInterfaces';
import useLocalStorage from '../../../../../util/LocalStorageHook';

const StyledFab = styled(Fab)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;

export const AddTaskDialog = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { refetchTasks } = React.useContext(DashboardContext);

  interface TaskValues {
    description: string;
    name: string;
  }

  const initialValues: TaskValues = {
    description: '',
    name: '',
  };

  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [values, setValues] = useLocalStorage<TaskValues>('AddTaskDialog.values', initialValues);

  useEffect(() => {
    resetValues();
  }, [dialogOpen]);

  const resetValues = () => {
    setValues({ ...initialValues });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDialogOpen(false);

    const createdTask = await fetch('/api/task', {
      body: JSON.stringify({
        description: values.description,
        name: values.name,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
    const task: Task = (await createdTask.json()).data;

    refetchTasks();
    resetValues();
    enqueueSnackbar(`Task "${task.id}" created!`, { variant: 'success' });
  };

  return (
    <>
      <StyledFab
        data-testid="addTaskDialog_fab"
        color="primary"
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        <AddIcon />
      </StyledFab>
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
      >
        <DialogTitle>Create task</DialogTitle>
        <form onSubmit={handleSubmit} data-testid="addTaskDialog_form">
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="addTaskDialog_name"
              name="name"
              label="Name"
              autoComplete="off"
              fullWidth
              required
              onChange={onChange}
            />
            <TextField
              margin="dense"
              id="addTaskDialog_description"
              name="description"
              label="Description"
              autoComplete="off"
              fullWidth
              onChange={onChange}
            />
          </DialogContent>
          <DialogActions>
            <Button color="secondary" type="submit">
              Create
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
