import React from 'react';
import { render } from '../../../util/Tests';
import { DashboardPage } from './DashboardPage';

describe('DashboardPage', () => {
  it('does render', async () => {
    render(<DashboardPage />);
  });
});
