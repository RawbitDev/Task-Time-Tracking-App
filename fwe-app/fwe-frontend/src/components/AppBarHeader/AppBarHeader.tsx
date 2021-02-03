// tslint:disable: no-submodule-imports
import React from 'react';
import { Breadcrumbs, IconButton, Menu, MenuItem, Switch } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListAltIcon from '@material-ui/icons/ListAlt';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import FilterListIcon from '@material-ui/icons/FilterList';
import { DashboardContext } from '../../contexts/DashboardContext';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icons: {
      color: 'white',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    root: {
      flexGrow: 1,
    },
    title: {
      color: 'white',
      flexGrow: 1,
    },
  }),
);

interface AppBarHeaderProps {
  title?: string;
}

export const AppBarHeader = ({ title }: AppBarHeaderProps) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { toggleFilterDialog, cleanLabelsOption } = React.useContext(DashboardContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const resetLocalStorage = () => {
    enqueueSnackbar(`Removed ${localStorage.length} entries from local storage!`, { variant: 'info' });
    localStorage.clear();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <ListAltIcon className={classes.menuButton} />
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className={classes.title}>
          <Typography variant="h6">Task Tracker</Typography>
          <Typography variant="h6" data-testid="title">
            {title}
          </Typography>
        </Breadcrumbs>
        <IconButton
          data-testid="filter"
          className={classes.icons}
          onClick={() => {
            toggleFilterDialog();
          }}
        >
          <FilterListIcon />
        </IconButton>
        <div>
          <IconButton className={classes.icons} onClick={handleClick} data-testid="menu">
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <DarkModeContext.Consumer>
              {({ darkMode, toggleDarkMode }) => (
                <MenuItem onClick={toggleDarkMode}>
                  Darkmode:
                  <Switch checked={darkMode} onChange={toggleDarkMode} />
                </MenuItem>
              )}
            </DarkModeContext.Consumer>
            <MenuItem onClick={cleanLabelsOption}>Clean labels</MenuItem>
            <MenuItem onClick={resetLocalStorage}>Clear local storage</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};
