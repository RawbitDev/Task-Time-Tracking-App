// tslint:disable: no-submodule-imports
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Chip } from '@material-ui/core';
import { TaskItemContext } from '../../../../../contexts/TaskItemContext';
import { DashboardContext } from '../../../../../contexts/DashboardContext';

export const EditableLabelList = () => {
  const { labelNames } = React.useContext(DashboardContext);
  const { labels, updateLabels } = React.useContext(TaskItemContext);

  return (
    <div>
      <Autocomplete
        multiple
        options={labelNames}
        value={labels}
        freeSolo
        filterSelectedOptions
        onChange={(_, labelList) => updateLabels(labelList)}
        renderTags={(labelList: string[], getLabelProps) =>
          labelList.map((label: string, index: number) => (
            <Chip key={label} size="small" label={label} {...getLabelProps({ index })} />
          ))
        }
        renderInput={(params) => <TextField {...params} variant="outlined" size="small" placeholder="Edit labels" />}
      />
    </div>
  );
};
