import React from 'react';
import { fireEvent, render } from '../../../../../util/Tests';
import { EditableLabelList } from './EditableLabelList';

describe('EditableLabelList', () => {
  it('does render', async () => {
    render(<EditableLabelList />);
  });

  it('let us edit the labels', async () => {
    const { getByPlaceholderText } = render(<EditableLabelList />);

    const labelInput = getByPlaceholderText('Edit labels') as HTMLInputElement;
    expect(labelInput.type).toBe('text');
    expect(labelInput.value).toBe('');

    fireEvent.change(labelInput, { target: { value: 'New test label' } });
    expect(labelInput.value).toBe('New test label');
  });
});
