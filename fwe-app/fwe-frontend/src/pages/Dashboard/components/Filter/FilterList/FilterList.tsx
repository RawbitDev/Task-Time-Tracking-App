import { Chip, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { DashboardContext } from '../../../../../contexts/DashboardContext';
import { FilterContainer } from '../../../../../util/FilterContainer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(0.5),
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      marginTop: 0,
      padding: theme.spacing(0.5),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  }),
);

export const FilterList = () => {
  const classes = useStyles();

  const { filters, updateFilter } = React.useContext(DashboardContext);

  const filterChanged = () => {
    const newFilter: FilterContainer = {
      description: filters.description,
      labels: filters.labels,
      name: filters.name,
    };
    updateFilter(newFilter);
  };

  return (
    <Paper component="ul" className={classes.root}>
      <Typography variant="h6" className={classes.chip}>
        Filter:
      </Typography>
      {filters.name ? (
        <li key={`Name:${filters.name}`}>
          <Chip
            label={`NAME: ${filters.name}`}
            onDelete={() => {
              filters.name = '';
              filterChanged();
            }}
            className={classes.chip}
          />
        </li>
      ) : (
        ''
      )}
      {filters.description ? (
        <li key={`Description:${filters.description}`}>
          <Chip
            label={`DESCRIPTION: ${filters.description}`}
            onDelete={() => {
              filters.description = '';
              filterChanged();
            }}
            className={classes.chip}
          />
        </li>
      ) : (
        ''
      )}
      {filters.labels.map((label: string) => {
        return (
          <li key={`Label:${label}`}>
            <Chip
              label={`LABEL: ${label}`}
              onDelete={() => {
                filters.labels = filters.labels.filter((currentLabel) => currentLabel !== label);
                filterChanged();
              }}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
};
