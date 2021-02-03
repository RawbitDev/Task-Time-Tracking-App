import React from 'react';
import { Task, Tracking } from '../../../../../util/EntityInterfaces';
import { fireEvent, render } from '../../../../../util/Tests';
import { TrackingItem } from './TrackingItem';

describe('TrackingItem', () => {
  const exampleTracking: Tracking = {
    id: '1',
    description: 'This is the 1st test tracking.',
    startTime: '2020-11-15T10:00:00.000Z',
    endTime: null,
    createdAt: '2020-12-06T23:55:37.802Z',
    updatedAt: '2020-12-06T23:55:37.000Z',
    task: {
      id: '1',
      name: 'TestTask1',
      description: 'This is the 1st test task.',
      createdAt: '2020-12-02T14:41:45.140Z',
      updatedAt: '2020-12-02T14:41:45.140Z',
    } as Task,
  };

  it('does render', async () => {
    render(<TrackingItem tracking={exampleTracking} />);
  });

  it('let us view and edit tracking', async () => {
    const { getByTestId, getByPlaceholderText } = render(<TrackingItem tracking={exampleTracking} />);

    getByTestId('trackingItem_form');

    const description = getByTestId('trackingItem_description') as HTMLHeadingElement;
    const time = getByTestId('trackingItem_time') as HTMLHeadingElement;
    const errorMissing = getByTestId('trackingItem_error_missing') as HTMLHeadingElement;
    const errorEarlier = getByTestId('trackingItem_error_earlier') as HTMLHeadingElement;

    expect(description.textContent).toBe(exampleTracking.description);
    expect(time.textContent).toContain('Time:');
    expect(errorMissing.textContent).toBe('Missing time parameter!');
    expect(errorEarlier.textContent).toBe('Start time cannot be earlier than end time!');

    const editButton = getByTestId('trackingItem_edit') as HTMLButtonElement;
    fireEvent.click(editButton);

    const descriptionInput = getByPlaceholderText('Description') as HTMLInputElement;
    expect(descriptionInput.type).toBe('text');
    expect(descriptionInput.value).toBe(exampleTracking.description);

    const newDescription = 'New Example Description';
    fireEvent.change(descriptionInput, { target: { value: newDescription } });
    expect(descriptionInput.value).toBe(newDescription);
  });
});
