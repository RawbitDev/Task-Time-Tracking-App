import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';

const AllProviders: React.FC = ({ children }) => {
  return <SnackbarProvider>{children}</SnackbarProvider>;
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
