// tslint:disable: no-submodule-imports
import React from 'react';
import styled from 'styled-components/macro';
import { Chip } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';
import { AppBarHeader } from '../AppBarHeader/AppBarHeader';

const headerHeight = '6rem';
const footerHeight = '3rem';

const Header = styled.header`
  height: ${headerHeight};
  width: 100%;
  align-items: center;
`;

const Main = styled.main`
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
`;

const Footer = styled.footer`
  height: ${footerHeight};
  padding: 1rem 1rem;
`;

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Header data-testid="header">
        <AppBarHeader title={title} />
      </Header>
      <Main>{children}</Main>
      <Footer data-testid="footer">
        <Chip variant="outlined" color="primary" icon={<CopyrightIcon />} label="2020 Ramon Walther" />
      </Footer>
    </>
  );
};
