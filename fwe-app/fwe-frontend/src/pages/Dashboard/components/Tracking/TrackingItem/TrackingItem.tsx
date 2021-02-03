// tslint:disable: no-submodule-imports
import React, { ChangeEvent, FormEvent } from 'react';
import {
  createStyles,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { Tracking } from '../../../../../util/EntityInterfaces';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { deleteTracking, patchTracking } from '../../../../../util/RequestHelper';
import { DashboardContext } from '../../../../../contexts/DashboardContext';
import { useSnackbar } from 'notistack';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from '@material-ui/pickers';
import useLocalStorage from '../../../../../util/LocalStorageHook';
import { formatDuration } from '../../../../../util/FormatDuration';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      color: theme.palette.secondary.main,
      margin: 0,
    },
    input: {
      marginBottom: theme.spacing(0.5),
      marginTop: theme.spacing(1.5),
    },
    root: {
      padding: theme.spacing(0.5),
    },
  }),
);

export type TrackingItemProps = {
  tracking: Tracking;
};

export const TrackingItem: React.FC<TrackingItemProps> = ({ tracking }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { refetchTasks } = React.useContext(DashboardContext);

  interface TrackingValues {
    description: string;
    endDate: string;
    startDate: string;
  }

  const initialValues: TrackingValues = {
    description: tracking.description,
    endDate: tracking.endTime,
    startDate: tracking.startTime,
  };

  const [edit, setEdit] = useLocalStorage<boolean>(`TrackingItem.${tracking.id}.edit`, false);
  const [values, setValues] = useLocalStorage<TrackingValues>(`TrackingItem.${tracking.id}.values`, initialValues);

  const resetValues = () => {
    setValues({ ...initialValues });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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

  const onDeleteTracking = async () => {
    await deleteTracking(tracking.id);
    refetchTasks();
    enqueueSnackbar(`Tracking "${tracking.id}" deleted!`, { variant: 'error' });
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEdit(false);

    await patchTracking(tracking.id, values.description, values.startDate, values.endDate);

    refetchTasks();
    enqueueSnackbar(`Tracking "${tracking.id}" edited!`, { variant: 'info' });
  };
  return (
    <form onSubmit={handleSave} data-testid="trackingItem_form">
      <ListItem>
        <Grid container direction="column" className={classes.root}>
          {edit ? (
            <TextField
              required
              fullWidth
              value={values.description}
              margin="dense"
              name="description"
              placeholder="Description"
              autoComplete="off"
              onChange={onChange}
            />
          ) : (
            <Typography variant="subtitle1" gutterBottom data-testid="trackingItem_description">
              {tracking.description}
            </Typography>
          )}
          {!tracking.startTime || !tracking.endTime || new Date(tracking.startTime) > new Date(tracking.endTime) ? (
            <Typography color="textSecondary" variant="subtitle2" gutterBottom data-testid="trackingItem_time">
              <del>
                {'Time: '}
                {formatDuration(
                  new Date(new Date(tracking.endTime).getTime() - new Date(tracking.startTime).getTime()),
                )}
              </del>
            </Typography>
          ) : (
            <Typography color="textSecondary" variant="subtitle2" gutterBottom data-testid="trackingItem_time">
              {'Time: '}
              {formatDuration(new Date(new Date(tracking.endTime).getTime() - new Date(tracking.startTime).getTime()))}
            </Typography>
          )}

          {!tracking.startTime || !tracking.endTime ? (
            <Typography
              className={classes.error}
              variant="subtitle2"
              gutterBottom
              data-testid="trackingItem_error_missing"
            >
              Missing time parameter!
            </Typography>
          ) : (
            ''
          )}
          {new Date(tracking.startTime) > new Date(tracking.endTime) ? (
            <Typography
              className={classes.error}
              variant="subtitle2"
              gutterBottom
              data-testid="trackingItem_error_earlier"
            >
              Start time cannot be earlier than end time!
            </Typography>
          ) : (
            ''
          )}
          {edit ? (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={1} className={classes.input}>
                <Grid item xs={12}>
                  <DatePicker
                    required
                    value={values.startDate}
                    onChange={onChangeStart}
                    label="Start date"
                    showTodayButton
                    disableFuture
                    maxDate={values.endDate}
                    format="dd.MM.yyyy"
                  />
                  <TimePicker
                    required
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
                    required
                    value={values.endDate}
                    onChange={onChangeEnd}
                    label="End date"
                    showTodayButton
                    disableFuture
                    minDate={values.startDate}
                    format="dd.MM.yyyy"
                  />
                  <TimePicker
                    required
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
          ) : (
            ''
          )}
        </Grid>
        <ListItemSecondaryAction>
          {edit ? (
            <>
              <IconButton
                data-testid="trackingItem_cancel"
                edge="end"
                onClick={() => {
                  resetValues();
                  setEdit(false);
                }}
              >
                <CancelIcon />
              </IconButton>
              <IconButton edge="end" type="submit" data-testid="trackingItem_save">
                <SaveIcon />
              </IconButton>
            </>
          ) : (
            <IconButton
              data-testid="trackingItem_edit"
              edge="end"
              onClick={() => {
                setEdit(true);
              }}
            >
              <EditIcon />
            </IconButton>
          )}
          <IconButton
            data-testid="trackingItem_delete"
            edge="end"
            onClick={async () => {
              await onDeleteTracking();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </form>
  );
};
