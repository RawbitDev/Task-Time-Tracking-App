import React from 'react';
import { render } from '../../../../../util/Tests';
import { FilterList } from './FilterList';

describe('filterList', () => {
  it('does render', async () => {
    render(<FilterList />);
  });
});
