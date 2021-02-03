import React from 'react';
import { Task, Tracking, Label } from '../../../../../../util/EntityInterfaces';
import { act, fireEvent, render } from '../../../../../../util/Tests';
import { TaskItem } from './TaskItem';

describe('TaskItem', () => {
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
    render(<TaskItem task={exampleTask} />);
  });

  it('let us start a timer', async () => {
    const { getByTestId, getByText, getByLabelText } = render(<TaskItem task={exampleTask} />);

    const startButton = getByText('Start timer') as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(startButton);
    });

    getByTestId('taskItem_timerForm');

    const descriptionInput = getByLabelText('Describe what you did *') as HTMLInputElement;
    expect(descriptionInput.type).toBe('textarea');
    expect(descriptionInput.value).toBe('');

    fireEvent.change(descriptionInput, { target: { value: 'I just wrote some tests!' } });
    expect(descriptionInput.value).toBe('I just wrote some tests!');

    const stopButton = getByText('Stop timer') as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(stopButton);
    });
  });
});
