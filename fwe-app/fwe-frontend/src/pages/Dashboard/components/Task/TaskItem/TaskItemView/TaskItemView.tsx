// tslint:disable: no-submodule-imports
import { useSnackbar } from 'notistack';
import React from 'react';
import { Chip, createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DashboardContext } from '../../../../../../contexts/DashboardContext';
import { TaskItemContext } from '../../../../../../contexts/TaskItemContext';
import { Label, Task } from '../../../../../../util/EntityInterfaces';
import { deleteTask } from '../../../../../../util/RequestHelper';

export type TaskItemProps = {
  task: Task;
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(0.25),
      },
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(1),
    },
  }),
);

export const TaskItemView: React.FC<TaskItemProps> = ({ task }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { refetchTasks } = React.useContext(DashboardContext);
  const { toggleEditMode } = React.useContext(TaskItemContext);

  const onDeleteTask = async () => {
    await deleteTask(task.id);
    refetchTasks();

    Object.keys(localStorage).forEach((key) => {
      // Clean up local storage
      if (key.includes(task.id)) {
        localStorage.removeItem(key);
      }
    });

    enqueueSnackbar(`Task "${task.id}" deleted!`, { variant: 'error' });
  };

  return (
    <Grid container direction="row">
      <Grid item xs={10} container direction="column" data-testid="taskItemView_id">
        <Typography variant="body2" color="textSecondary">
          ID: {task.id}
        </Typography>
        <Typography gutterBottom variant="subtitle1" data-testid="taskItemView_name">
          {task.name}
        </Typography>
        <Typography variant="body2" gutterBottom display="inline" data-testid="taskItemView_description">
          {task.description}
        </Typography>
        <div className={classes.root}>
          {task.labels.map((label: Label) => {
            return <Chip key={label.id} size="small" label={label.name} />;
          })}
        </div>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={1}>
        <IconButton
          data-testid="taskItemView_delete"
          onClick={() => {
            onDeleteTask();
          }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          data-testid="taskItemView_edit"
          onClick={() => {
            toggleEditMode();
          }}
        >
          <EditIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
