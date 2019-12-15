import React, {FC, ReactNode} from 'react';
import {Layout} from 'antd';
import styled from '@emotion/styled';

const {Header: CoreHeader} = Layout;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled(CoreHeader)`
  display: flex;
  justify-content: center;
  background-color: #ffffff;
`;

const Content = styled.div`
  width: 1050px;
  align-self: center;
  padding-top: 50px;
  padding-bottom: 32px;
`;

interface Props {
  header: ReactNode;
}

const MainLayout: FC<Props> = ({children, header}) => (
  <Container>
    <Header>{header}</Header>
    <Content>{children}</Content>
  </Container>
);

export default MainLayout;
