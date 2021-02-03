// tslint:disable: no-submodule-imports
import React from 'react';
import {
  AppBar,
  createStyles,
  Dialog,
  IconButton,
  List,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import { TaskItemContext } from '../../../../../contexts/TaskItemContext';
import { Task, Tracking } from '../../../../../util/EntityInterfaces';
import { TrackingItem } from '../TrackingItem/TrackingItem';
import { AddTrackingDialog } from '../AddTrackingDialog/AddTrackingDialog';
import AddIcon from '@material-ui/icons/Add';

export type TaskItemProps = {
  task: Task;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      flex: 1,
      marginLeft: theme.spacing(2),
    },
  }),
);

const Transition = React.forwardRef(
  (props: TransitionProps & { children?: React.ReactElement }, ref: React.Ref<unknown>) => {
    return <Slide direction="up" ref={ref} {...props} />;
  },
);

export const TrackingList: React.FC<TaskItemProps> = ({ task }) => {
  const classes = useStyles();
  const { toggleNewTrackingDialog, viewTrackingsMode, toggleViewTrackingsMode } = React.useContext(TaskItemContext);

  return (
    <div>
      <Dialog fullScreen open={viewTrackingsMode} onClose={toggleViewTrackingsMode} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleViewTrackingsMode}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} data-testid="trackingList_title">
              Trackings of {task.name}
            </Typography>
            <IconButton edge="end" color="inherit" onClick={toggleNewTrackingDialog} data-testid="trackingList_new">
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List dense data-testid="trackingList_list">
          {task.trackings.map((tracking: Tracking) => {
            return <TrackingItem key={tracking.id} tracking={tracking} data-testid="tracking-item" />;
          })}
        </List>
      </Dialog>
      <AddTrackingDialog task={task} />
    </div>
  );
};
