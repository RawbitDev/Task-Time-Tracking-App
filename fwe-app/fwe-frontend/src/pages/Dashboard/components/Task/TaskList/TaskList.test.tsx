import React from 'react';
import { render } from '../../../../../util/Tests';
import { TaskList } from './TaskList';

describe('TaskList', () => {
  it('does render', async () => {
    render(<TaskList />);
  });
});
