import React from 'react';
import { Task } from '../../../../../../util/EntityInterfaces';
import { act, fireEvent, render } from '../../../../../../util/Tests';
import { TaskItemEdit } from './TaskItemEdit';

describe('TaskItemEdit', () => {
  const exampleTask: Task = {
    createdAt: '2020-11-22T15:56:57.121Z',
    description: 'Hey there, this is a simple example task!',
    id: '0cb23bc4-bc7c-4512-b749-37a74e7a03d1',
    labels: [],
    name: 'Example Task',
    trackings: [],
    updatedAt: '2020-11-22T15:56:57.121Z',
  };

  it('does render', async () => {
    render(<TaskItemEdit task={exampleTask} />);
  });

  it('let us edit a task', async () => {
    const { getByTestId, getByPlaceholderText } = render(<TaskItemEdit task={exampleTask} />);

    getByTestId('taskItemEdit_form');

    const nameInput = getByPlaceholderText('Name') as HTMLInputElement;
    expect(nameInput.type).toBe('text');
    expect(nameInput.value).toBe(exampleTask.name);

    const descriptionInput = getByPlaceholderText('Description') as HTMLInputElement;
    expect(descriptionInput.type).toBe('textarea');
    expect(descriptionInput.value).toBe(exampleTask.description);

    fireEvent.change(nameInput, { target: { value: 'New Task Name' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Task Description' } });

    const saveButton = getByTestId('taskItemEdit_submit') as HTMLButtonElement;

    await act(async () => {
      fireEvent.click(saveButton);
    });
  });
});
