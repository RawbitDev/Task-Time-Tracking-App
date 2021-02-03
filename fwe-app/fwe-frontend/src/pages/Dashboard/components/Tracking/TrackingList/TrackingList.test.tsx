import React from 'react';
import { Task, Tracking, Label } from '../../../../../util/EntityInterfaces';
import { render } from '../../../../../util/Tests';
import { TrackingList } from './TrackingList';

describe('TrackingList', () => {
  const exampleTask: Task = {
    id: '1',
    name: 'TestTask1',
    description: 'This is the 1st test task.',
    createdAt: '2020-12-02T14:41:45.140Z',
    updatedAt: '2020-12-02T14:41:45.140Z',
    trackings: [
      {
        id: '1',
        description: 'This is the 1st test tracking.',
        startTime: '2020-11-15T10:00:00.000Z',
        endTime: null,
        createdAt: '2020-12-06T23:55:37.802Z',
        updatedAt: '2020-12-06T23:55:37.000Z',
      } as Tracking,
      {
        id: '3',
        description: 'This is the 3rd test tracking.',
        startTime: '2020-11-15T12:00:00.000Z',
        endTime: '2020-11-15T15:00:00.000Z',
        createdAt: '2020-12-06T23:55:37.815Z',
        updatedAt: '2020-12-06T23:55:37.815Z',
      } as Tracking,
    ],
    labels: [
      {
        id: '1',
        name: 'TestLabel1',
        createdAt: '2020-11-26T00:11:04.037Z',
        updatedAt: '2020-11-26T00:11:04.037Z',
      } as Label,
      {
        id: '2',
        name: 'TestLabel2',
        createdAt: '2020-12-02T14:41:45.088Z',
        updatedAt: '2020-12-02T14:41:45.088Z',
      } as Label,
      {
        id: '3',
        name: 'TestLabel3',
        createdAt: '2020-11-26T00:11:04.052Z',
        updatedAt: '2020-11-26T00:11:04.052Z',
      } as Label,
    ],
  };

  it('does render', async () => {
    render(<TrackingList task={exampleTask} />);
  });
});
