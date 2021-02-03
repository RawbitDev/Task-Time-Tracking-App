import React from 'react';
import { Task } from '../../../../../../util/EntityInterfaces';
import { render } from '../../../../../../util/Tests';
import { TaskItemView } from './TaskItemView';

describe('TaskItemView', () => {
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
    render(<TaskItemView task={exampleTask} />);
  });

  it('let us view a task', async () => {
    const { getByTestId } = render(<TaskItemView task={exampleTask} />);

    const id = getByTestId('taskItemView_id') as HTMLParagraphElement;
    expect(id.textContent).toContain(exampleTask.id);

    const name = getByTestId('taskItemView_name') as HTMLHeadingElement;
    expect(name.textContent).toBe(exampleTask.name);

    const description = getByTestId('taskItemView_description') as HTMLParagraphElement;
    expect(description.textContent).toBe(exampleTask.description);
  });
});
