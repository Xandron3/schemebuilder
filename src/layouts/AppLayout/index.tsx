import React, {FC} from 'react';
import {Layout} from 'antd';
import styled from '@emotion/styled';

const {Content: CoreContent} = Layout;

const Container = styled(Layout)`
  min-height: 100vh;
`;

const Content = styled(CoreContent)`
  display: flex;
  flex-grow: 1;
`;

const AppLayout: FC = ({children}) => (
  <Container>
    <Content>{children}</Content>
  </Container>
);

export default AppLayout;
