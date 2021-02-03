import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { TaskItemContext } from '../../../../../../contexts/TaskItemContext';
import { Label, Task, Tracking } from '../../../../../../util/EntityInterfaces';
import { TaskItemEdit } from '../TaskItemEdit/TaskItemEdit';
import { TaskItemView } from '../TaskItemView/TaskItemView';
import { TrackingList } from '../../../Tracking/TrackingList/TrackingList';
import {
  createTracking,
  addTrackingsToTask,
  fetchTrackingsOfTask,
  patchTrackingDescription,
  getExampleTask,
} from '../../../../../../util/RequestHelper';
import { useSnackbar } from 'notistack';
import { DashboardContext } from '../../../../../../contexts/DashboardContext';
import useLocalStorage from '../../../../../../util/LocalStorageHook';
import { formatDuration } from '../../../../../../util/FormatDuration';

export type TaskItemProps = {
  task: Task;
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: theme.spacing(1),
    },
    input: {
      marginBottom: theme.spacing(1.5),
    },
  }),
);

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { refetchTasks, tasks } = React.useContext(DashboardContext);

  const [edit, setEdit] = useLocalStorage<boolean>(`TaskItem.${task.id}.edit`, false);
  const [pause, setPause] = useLocalStorage<boolean>(`TaskItem.${task.id}.pause`, false);
  const [timer, setTimer] = useLocalStorage<boolean>(`TaskItem.${task.id}.timer`, false);
  const [viewTrackings, setViewTrackings] = useLocalStorage<boolean>(`TaskItem.${task.id}.viewTrackings`, false);
  const [taskLabelNames, setTaskLabelNames] = useLocalStorage<string[]>(`TaskItem.${task.id}.taskLabelNames`, []);

  const [totalDate, setTotalDate] = useLocalStorage<Date>(`TaskItem.${task.id}.totalDate`, new Date(0));
  const [totalTime, setTotalTime] = useLocalStorage<string>(`TaskItem.${task.id}.totalTime`, '00:00:00');
  const [currentTime, setCurrentTime] = useLocalStorage<string>(`TaskItem.${task.id}.currentTime`, '00:00:00');
  const [startDate, setStartDate] = useLocalStorage<Date>(`TaskItem.${task.id}.startDate`, new Date());
  const [endDate, setEndDate] = useLocalStorage<Date>(`TaskItem.${task.id}.endDate`, new Date());

  const [timerLoop, setTimerLoop] = useLocalStorage<number>(`TaskItem.${task.id}.timerLoop`, 0);
  const [trackingDescription, setTrackingDescription] = useLocalStorage<string>(
    `TaskItem.${task.id}.trackingDescription`,
    '',
  );
  const [trackingBuffer, setTrackingBuffer] = useLocalStorage<Tracking[]>(`TaskItem.${task.id}.trackingBuffer`, []);
  const [placeholder, setPlaceholder] = useLocalStorage<string>(`TaskItem.${task.id}.placeholder`, '');
  const [trackingDialog, setTrackingDialog] = useLocalStorage<boolean>(`TaskItem.${task.id}.trackingDialog`, false);

  useEffect(() => {
    (async () => {
      await fetchTotalTime();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      updateTime();
    })();
  }, [totalDate, startDate, endDate]);

  useEffect(() => {
    (async () => {
      await fetchTotalTime();
    })();
  }, [tasks]);

  useEffect(() => {
    (async () => {
      if (timer) {
        setTimerLoop(
          setTimeout(() => {
            setEndDate(new Date());
          }, 1000),
        );
      }
    })();
  }, [endDate]);

  const reloadLabelNames = async () => {
    const labelNames = task.labels.map((label: Label) => {
      return label.name;
    });
    setTaskLabelNames(labelNames);
  };

  const toggleEdit = async () => {
    await reloadLabelNames();
    setEdit(!edit);
  };

  const toggleViewTrackings = async () => {
    setViewTrackings(!viewTrackings);
  };

  const toggleTrackingDialog = async () => {
    setTrackingDialog(!trackingDialog);
  };

  const updateTaskLabels = async (labels: string[]) => {
    setTaskLabelNames(labels);
  };

  const context = {
    editMode: edit,
    labels: taskLabelNames,
    newTrackingDialog: trackingDialog,
    toggleEditMode: toggleEdit,
    toggleNewTrackingDialog: toggleTrackingDialog,
    toggleViewTrackingsMode: toggleViewTrackings,
    updateLabels: updateTaskLabels,
    viewTrackingsMode: viewTrackings,
  };

  const fetchTotalTime = async () => {
    const trackings: Tracking[] = await fetchTrackingsOfTask(task.id);
    let newTotalDate: Date = new Date(0);
    for (const tracking of trackings) {
      // Ignore not finished trackings
      if (tracking.startTime && tracking.endTime && tracking.startTime <= tracking.endTime) {
        const start: Date = new Date(tracking.startTime);
        const end: Date = new Date(tracking.endTime);
        const duration = new Date(end.getTime() - start.getTime());
        newTotalDate = new Date(newTotalDate.getTime() + duration.getTime());
      }
    }
    setTotalDate(newTotalDate);
  };

  const resetTracking = () => {
    setStartDate(new Date());
    setEndDate(new Date());
    setCurrentTime('00:00:00');
  };

  const startTracking = async () => {
    resetTracking();
    setTimer(true);
    const newPlaceholder: string = await getExampleTask();
    setPlaceholder(newPlaceholder);
  };

  const getBufferedDuration = (): Date => {
    let totalTrackingDuration: Date = new Date(0);
    for (const tracking of trackingBuffer) {
      const start: Date = new Date(tracking.startTime);
      const end: Date = new Date(tracking.endTime);
      const trackingDuration = new Date(end.getTime() - start.getTime());
      totalTrackingDuration = new Date(totalTrackingDuration.getTime() + trackingDuration.getTime());
    }
    return totalTrackingDuration;
  };

  const updateTime = () => {
    const bufferedDuration: Date = getBufferedDuration();
    let duration: Date = new Date(0);
    let totalDuration: Date = totalDate;
    if (!pause) {
      duration = new Date(endDate.getTime() - startDate.getTime());
      totalDuration = new Date(totalDate.getTime() + duration.getTime());
    }
    const bufferAddedDuration = new Date(bufferedDuration.getTime() + duration.getTime());
    const bufferAddedTotalDuration = new Date(bufferedDuration.getTime() + totalDuration.getTime());
    setCurrentTime(formatDuration(bufferAddedDuration));
    setTotalTime(formatDuration(bufferAddedTotalDuration));
  };

  const onChangeTracking = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackingDescription(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimer(false);
    clearTimeout(timerLoop);
    if (!pause) {
      // Add the current tracking to the buffer too
      await addTrackingToBuffer();
    }

    // Update description of all buffered trackings
    for (const tracking of trackingBuffer) {
      await patchTrackingDescription(tracking.id, trackingDescription);
    }

    // Add them to the task
    const trackingIds: string[] = trackingBuffer.map((tracking: Tracking) => {
      return tracking.id;
    });
    await addTrackingsToTask(task.id, trackingIds);

    setTrackingBuffer([]);
    resetTracking();
    refetchTasks();
    await fetchTotalTime();
    enqueueSnackbar(`${trackingIds.length} trackings saved!`, { variant: 'success' });
  };

  const onPause = async () => {
    if (!pause) {
      setPause(true);
      setTimer(false);
      clearTimeout(timerLoop);
      await addTrackingToBuffer();
    } else {
      setPause(false);
      startTracking();
    }
  };

  const addTrackingToBuffer = async () => {
    const newTracking: Tracking = await createTracking(
      trackingDescription,
      startDate.toISOString(),
      endDate.toISOString(),
    );
    trackingBuffer.push(newTracking);
    setTrackingBuffer(trackingBuffer); // So the tracking puffer gets updated
  };

  return (
    <Card variant="outlined">
      <TaskItemContext.Provider value={context}>
        <CardContent>
          <div>{edit ? <TaskItemEdit task={task} /> : <TaskItemView task={task} />}</div>
          <Typography gutterBottom variant="body2">
            Total time: {totalTime}
          </Typography>
        </CardContent>
        <CardActions>
          {timer || pause ? (
            <Grid container direction="column">
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Tracking time... {currentTime}
                </Typography>
              </Grid>
              <form onSubmit={handleSubmit} data-testid="taskItem_timerForm">
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    autoFocus
                    id="taskItemDescription"
                    margin="dense"
                    name="description"
                    label="Describe what you did"
                    placeholder={placeholder}
                    autoComplete="off"
                    variant="outlined"
                    size="small"
                    value={trackingDescription}
                    fullWidth
                    required
                    multiline
                    onChange={onChangeTracking}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button className={classes.button} size="small" color="secondary" variant="outlined" type="submit">
                    Stop timer
                  </Button>
                  <Button
                    className={classes.button}
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={async () => {
                      await onPause();
                    }}
                  >
                    {pause ? 'Resume timer' : 'Pause timer'}
                  </Button>
                  <Button
                    className={classes.button}
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={() => {
                      setPause(false);
                      setTimer(false);
                      clearTimeout(timerLoop);
                      setTrackingBuffer([]);
                      resetTracking();
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </form>
            </Grid>
          ) : (
            <Grid container direction="column" data-testid="taskItem_startTimer">
              <Grid item xs={12}>
                <Button
                  className={classes.button}
                  size="small"
                  color="secondary"
                  variant="outlined"
                  onClick={() => {
                    setTrackingDescription('');
                    startTracking();
                  }}
                >
                  Start timer
                </Button>
                <Badge color="secondary" badgeContent={task.trackings.length} invisible={task.trackings.length === 0}>
                  <Button
                    className={classes.button}
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={() => {
                      // Reset the dialog
                      setViewTrackings(false);
                      setViewTrackings(true);
                    }}
                  >
                    View trackings
                  </Button>
                </Badge>
              </Grid>
            </Grid>
          )}
        </CardActions>
        <TrackingList task={task} />
      </TaskItemContext.Provider>
    </Card>
  );
};
