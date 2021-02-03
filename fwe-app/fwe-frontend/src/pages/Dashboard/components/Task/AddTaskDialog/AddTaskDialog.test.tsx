import React from 'react';
import { act, fireEvent, render } from '../../../../../util/Tests';
import { AddTaskDialog } from './AddTaskDialog';

describe('AddTaskDialog', () => {
  it('does render', async () => {
    render(<AddTaskDialog />);
  });

  it('let us create a new task', async () => {
    const task = {
      description: 'Hey there, this is a simple example task!',
      name: 'Example Task',
    };

    const { getByTestId, getByLabelText, getByText } = render(<AddTaskDialog />);

    const addTaskButton = getByTestId('addTaskDialog_fab') as HTMLButtonElement;
    expect(addTaskButton.type).toBe('button');

    await act(async () => {
      fireEvent.click(addTaskButton); // Open the modal
    });

    getByTestId('addTaskDialog_form');

    const nameInput = getByLabelText('Name *') as HTMLInputElement;
    expect(nameInput.type).toBe('text');

    const descriptionInput = getByLabelText('Description') as HTMLInputElement;
    expect(descriptionInput.type).toBe('text');

    fireEvent.change(nameInput, { target: { value: task.name } });
    fireEvent.change(descriptionInput, { target: { value: task.description } });

    const submitButton = getByText('Create') as HTMLButtonElement;

    await act(async () => {
      fireEvent.click(submitButton);
    });
  });
});
