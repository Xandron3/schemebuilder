import React, {FC, useCallback} from 'react';
import styled from '@emotion/styled';
import {Menu as CoreMenu, Button} from 'antd';
import {withRouter, RouteComponentProps} from 'react-router';

import {deleteToken} from 'data';
import {ReactComponent as Logo} from 'assets/sibdev-logo.svg';

const Container = styled.div`
  flex-basis: 1050px;
  display: flex;
  align-items: center;

  & > div {
    display: flex;
    align-items: center;
    flex-grow: 1;
    height: 100%;
  }
`;

const Menu = styled(CoreMenu)`
  height: 100%;
  
  li {
    line-height: 64px;
    margin: 0 20px;
  }
`;

const {Item: MenuItem} = CoreMenu;

const Header: FC<RouteComponentProps> = ({history, location}) => {
  const handleChangeSelectedKey = useCallback((e) => {
    history.push(e.key);
  }, [history]);
  
  const handleLogout = useCallback(() => {
    deleteToken();
    history.push('/login');
  }, [history]);

  return (
    <Container>
      <div>
        <Logo height="48" />
        <Menu
          onSelect={handleChangeSelectedKey}
          selectedKeys={[location.pathname]}
          mode="horizontal"
        >
          <MenuItem key="/schemes/my">Мои схемы</MenuItem>
          <MenuItem key="/schemes/create">Создать схему</MenuItem>
        </Menu>
      </div>
      <Button onClick={handleLogout} type="link">Выйти</Button>
    </Container>
  );
};

export default withRouter(Header);
