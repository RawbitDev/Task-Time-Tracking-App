import React from 'react';
import { render } from '../../../../../util/Tests';
import { EditFilterDialog } from './EditFilterDialog';

describe('editFilterDialog', () => {
  it('does render', async () => {
    render(<EditFilterDialog />);
  });
});
