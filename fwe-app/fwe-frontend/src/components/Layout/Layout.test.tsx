import React from 'react';
import { render } from '../../util/Tests';
import { Layout } from './Layout';

describe('Layout', () => {
  it('does render', async () => {
    render(
      <Layout>
        <p>Hello World!</p>
      </Layout>,
    );
  });

  it('added the header and the footer', async () => {
    const { getByTestId } = render(<Layout> </Layout>);
    getByTestId('header') as HTMLElement;
    getByTestId('footer') as HTMLElement;
  });
});
