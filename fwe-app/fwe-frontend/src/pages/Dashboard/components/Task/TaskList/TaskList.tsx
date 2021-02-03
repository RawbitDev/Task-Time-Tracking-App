import React from 'react';
import { Grid } from '@material-ui/core';
import { DashboardContext } from '../../../../../contexts/DashboardContext';
import { Task } from '../../../../../util/EntityInterfaces';
import { TaskItem } from '../TaskItem/TaskItem/TaskItem';

export const TaskList = () => {
  const { tasks } = React.useContext(DashboardContext);

  return (
    <Grid container spacing={3}>
      {tasks.map((task: Task) => {
        return (
          <Grid item key={task.id} xs={12} sm={6} md={4} data-testid="task-item">
            <TaskItem task={task} />
          </Grid>
        );
      })}
    </Grid>
  );
};
