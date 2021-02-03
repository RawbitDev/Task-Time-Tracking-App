// tslint:disable: no-submodule-imports
import { useSnackbar } from 'notistack';
import React, { ChangeEvent, FormEvent } from 'react';
import { createStyles, IconButton, makeStyles, TextField, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { DashboardContext } from '../../../../../../contexts/DashboardContext';
import { TaskItemContext } from '../../../../../../contexts/TaskItemContext';
import { Label, Task } from '../../../../../../util/EntityInterfaces';
import { createLabel, deleteTask, updateLabelsOfTask } from '../../../../../../util/RequestHelper';
import { EditableLabelList } from '../../../Label/EditableLabelList/EditableLabelList';
import useLocalStorage from '../../../../../../util/LocalStorageHook';

export type TaskItemProps = {
  task: Task;
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    labels: {
      '& > *': {
        margin: theme.spacing(0.25),
      },
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(1),
    },
    root: {
      '& > *': {
        margin: theme.spacing(0.25),
      },
    },
  }),
);

export const TaskItemEdit: React.FC<TaskItemProps> = ({ task }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { refetchTasks, refetchLabels, allLabels } = React.useContext(DashboardContext);
  const { toggleEditMode, labels } = React.useContext(TaskItemContext);

  interface TaskValues {
    description: string;
    name: string;
  }

  const initialValues: TaskValues = {
    description: task.description || '',
    name: task.name || '',
  };

  const [values, setValues] = useLocalStorage<TaskValues>(`TaskItemEdit.${task.id}.values`, initialValues);

  const onChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onDeleteTask = async () => {
    await deleteTask(task.id);
    refetchTasks();
    enqueueSnackbar(`Task "${task.id}" deleted!`, { variant: 'error' });
  };

  const saveChanges = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggleEditMode();

    await saveTaskChanges();
    await saveLabelChanges();

    enqueueSnackbar(`Task "${task.id}" edited!`, { variant: 'info' });
    refetchTasks();
  };

  const saveTaskChanges = async () => {
    await fetch(`/api/task/${task.id}`, {
      body: JSON.stringify({
        description: values.description,
        name: values.name,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
    });
  };

  const saveLabelChanges = async () => {
    const taskLabels: Label[] = [];

    for (const labelName of labels) {
      const label: Label | undefined = allLabels.find((labelItem: Label) => labelItem.name === labelName);
      if (label) {
        taskLabels.push(label);
      } else {
        const createdLabel: Label = await createLabel(labelName);
        taskLabels.push(createdLabel);
      }
    }

    const labelIds: string[] = taskLabels.map((label: Label) => {
      return label.id;
    });

    await updateLabelsOfTask(task.id, labelIds);
    refetchLabels();
  };

  return (
    <form onSubmit={saveChanges} data-testid="taskItemEdit_form">
      <Grid container direction="row">
        <Grid item xs={10} container direction="column">
          <Typography variant="body2" color="textSecondary">
            ID: {task.id}
          </Typography>
          <TextField
            required
            name="name"
            placeholder="Name"
            className={classes.root}
            value={values.name}
            onChange={onChangeTask}
          />
          <TextField
            data-testid="taskItemEdit_description"
            name="description"
            placeholder="Description"
            className={classes.root}
            value={values.description}
            size="small"
            onChange={onChangeTask}
            multiline
          />
          <div className={classes.labels}>
            <EditableLabelList />
          </div>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={1}>
          <IconButton
            onClick={() => {
              onDeleteTask();
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton type="submit" data-testid="taskItemEdit_submit">
            <SaveIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              toggleEditMode();
              setValues({ ...initialValues });
            }}
          >
            <CancelIcon />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};
