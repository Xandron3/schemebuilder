import React, {FC, useState, useEffect, useCallback} from 'react';
import {Typography, Button, Form, Skeleton} from 'antd';
import {withRouter, RouteComponentProps} from 'react-router';
import _ from 'lodash';

import {getForms} from 'data';
import Main from 'modules/main';
import SchemesList from 'components/SchemesList';

const {Title, Paragraph} = Typography;

const MySchemesPage: FC<RouteComponentProps> = ({history}) => {
  const [schemes, setSchemes] = useState();
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    getForms()
      .then(schemes => setSchemes(schemes))
      .catch(err => console.error(err))
      .finally(() => setFetching(false))
  }, []);

  const handleCreateClick = useCallback(() => {
    history.push('/schemes/create')
  }, [history]);

  return (
    <Main>
      <Form.Item>
        <Title level={3}>Мои схемы</Title>
      </Form.Item>
      <Form.Item>
      {!isFetching
        ? (
          !_.isEmpty(schemes)
            ? <SchemesList schemes={schemes} setSchemes={setSchemes} />
            : <Paragraph>Схемы не найдены</Paragraph>
        )
        : <Skeleton active />
      }
      </Form.Item>
      <Button
        type="primary"
        onClick={handleCreateClick}
        size="large"
      >
        Создать схему
      </Button>
    </Main>
  );
}

export default withRouter(MySchemesPage);
