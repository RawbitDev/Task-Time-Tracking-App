import React from 'react';

const typedStrings: string[] = [];

export const TaskItemContext = React.createContext({
  // tslint:disable: no-empty
  editMode: false,
  labels: typedStrings,
  newTrackingDialog: false,
  toggleEditMode: () => {},
  toggleNewTrackingDialog: () => {},
  toggleViewTrackingsMode: () => {},
  updateLabels: (newLabels: string[]) => {},
  viewTrackingsMode: false,
});
