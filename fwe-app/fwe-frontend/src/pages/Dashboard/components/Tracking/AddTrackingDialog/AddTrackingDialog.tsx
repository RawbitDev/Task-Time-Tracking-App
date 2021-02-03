// tslint:disable: no-submodule-imports
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { useSnackbar } from 'notistack';
import React, { ChangeEvent, FormEvent } from 'react';
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { TaskItemContext } from '../../../../../contexts/TaskItemContext';
import { Task, Tracking } from '../../../../../util/EntityInterfaces';
import { addTrackingToTask, createTracking } from '../../../../../util/RequestHelper';
import { DashboardContext } from '../../../../../contexts/DashboardContext';
import useLocalStorage from '../../../../../util/LocalStorageHook';

export type TaskItemProps = {
  task: Task;
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      marginBottom: theme.spacing(0.5),
      marginTop: theme.spacing(1.5),
    },
  }),
);

export const AddTrackingDialog: React.FC<TaskItemProps> = ({ task }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { refetchTasks } = React.useContext(DashboardContext);
  const { toggleNewTrackingDialog, newTrackingDialog } = React.useContext(TaskItemContext);

  interface TrackingValues {
    description: string;
    endDate: string;
    startDate: string;
  }

  const initialValues: TrackingValues = {
    description: '',
    endDate: new Date().toISOString(),
    startDate: new Date().toISOString(),
  };

  const [values, setValues] = useLocalStorage<TrackingValues>(`AddTrackingDialog.${task.id}.values`, initialValues);

  const resetValues = () => {
    setValues({ ...initialValues });
  };

  const onChangeStart = (date: Date | null) => {
    if (date) {
      setValues({ ...values, startDate: date.toISOString() });
    }
  };

  const onChangeEnd = (date: Date | null) => {
    if (date) {
      setValues({ ...values, endDate: date.toISOString() });
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggleNewTrackingDialog();

    const createdTracking: Tracking = await createTracking(values.description, values.startDate, values.endDate);
    await addTrackingToTask(task.id, createdTracking.id);

    refetchTasks();
    resetValues();
    enqueueSnackbar(`Tracking "${createdTracking.id}" added to task "${task.id}"!`, { variant: 'success' });
  };

  return (
    <>
      <Dialog open={newTrackingDialog} onClose={toggleNewTrackingDialog}>
        <DialogTitle>Create tracking</DialogTitle>
        <form onSubmit={handleSubmit} data-testid="addTracking_form">
          <DialogContent>
            <>
              <TextField
                id="addTracking_description"
                autoFocus
                required
                value={values.description}
                margin="dense"
                name="description"
                label="Description"
                autoComplete="off"
                fullWidth
                onChange={onChange}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={1} className={classes.input}>
                  <Grid item xs={12}>
                    <DatePicker
                      value={values.startDate}
                      onChange={onChangeStart}
                      label="Start date"
                      showTodayButton
                      disableFuture
                      maxDate={values.endDate}
                      format="dd.MM.yyyy"
                    />
                    <TimePicker
                      value={values.startDate}
                      onChange={onChangeStart}
                      label="Start time"
                      showTodayButton
                      ampm={false}
                      format="HH:mm:ss"
                      views={['hours', 'minutes', 'seconds']}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      value={values.endDate}
                      onChange={onChangeEnd}
                      label="End date"
                      showTodayButton
                      disableFuture
                      minDate={values.startDate}
                      format="dd.MM.yyyy"
                    />
                    <TimePicker
                      value={values.endDate}
                      onChange={onChangeEnd}
                      label="End time"
                      showTodayButton
                      ampm={false}
                      format="HH:mm:ss"
                      views={['hours', 'minutes', 'seconds']}
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" type="submit">
              Create
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                toggleNewTrackingDialog();
                resetValues();
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
