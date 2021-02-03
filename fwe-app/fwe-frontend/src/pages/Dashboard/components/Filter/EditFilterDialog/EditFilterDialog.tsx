import { useSnackbar } from 'notistack';
import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import {
  Button,
  Chip,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { DashboardContext } from '../../../../../contexts/DashboardContext';
import { FilterContainer } from '../../../../../util/FilterContainer';
import { Autocomplete } from '@material-ui/lab';
import useLocalStorage from '../../../../../util/LocalStorageHook';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    labels: {
      '& > *': {
        margin: theme.spacing(0.25),
      },
      marginTop: theme.spacing(2.5),
    },
  }),
);

export const EditFilterDialog = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { labelNames, filters, filterDialog, toggleFilterDialog, updateFilter } = React.useContext(DashboardContext);

  const [changeDataFlag, setChangeDataFlag] = useLocalStorage<boolean>('EditFilterDialog.changeDataFlag', false);
  const [values, setValues] = useLocalStorage<FilterContainer>('EditFilterDialog.values', filters);

  useEffect(() => {
    if (!changeDataFlag) {
      setValues(filters);
    }
  }, [filters]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setChangeDataFlag(true);
  };

  const changeLabels = (newLabels: string[]) => {
    const newValues: FilterContainer = {
      description: values.description,
      labels: newLabels,
      name: values.name,
    };
    setValues(newValues);
    setChangeDataFlag(true);
  };

  const initialValues: FilterContainer = {
    description: '',
    labels: [],
    name: '',
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateFilter(values);
    toggleFilterDialog();
    setChangeDataFlag(false);
    enqueueSnackbar(`Filters updated!`, { variant: 'info' });
  };

  return (
    <>
      <Dialog
        open={filterDialog}
        onClose={() => {
          toggleFilterDialog();
          setChangeDataFlag(false);
        }}
      >
        <DialogTitle>Filter settings</DialogTitle>
        <form onSubmit={handleSubmit} data-testid="editFilterDialog_form">
          <DialogContent>
            <TextField
              id="editFilter_name"
              autoFocus
              value={values.name}
              margin="dense"
              name="name"
              label="Name"
              autoComplete="off"
              fullWidth
              onChange={onChange}
            />
            <TextField
              id="editFilter_description"
              value={values.description}
              margin="dense"
              name="description"
              label="Description"
              autoComplete="off"
              fullWidth
              onChange={onChange}
            />
            <Autocomplete
              className={classes.labels}
              multiple
              options={labelNames}
              value={values.labels}
              filterSelectedOptions
              onChange={(_, labelList) => {
                changeLabels(labelList);
              }}
              renderTags={(labelList: string[], getLabelProps) =>
                labelList.map((label: string, index: number) => (
                  <Chip key={label} size="small" label={label} {...getLabelProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} variant="outlined" size="small" placeholder="Select labels" />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button color="secondary" type="submit">
              Apply filters
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                resetValues();
              }}
            >
              Clear filters
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                toggleFilterDialog();
                setChangeDataFlag(false);
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
