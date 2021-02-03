import React from 'react';
import { render } from '../../util/Tests';
import { AppBarHeader } from './AppBarHeader';

describe('AppBarHeader', () => {
  it('does render', async () => {
    render(<AppBarHeader />);
  });

  it('added the title to the site', async () => {
    const title = 'This is the title!';
    const { getByTestId } = render(<AppBarHeader title={title} />);
    const appTitle = getByTestId('title') as HTMLHeadingElement;
    expect(appTitle.textContent).toBe(title);
  });
});
