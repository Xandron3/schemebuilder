import React, {FC, ReactNode, useCallback} from 'react';
import {List, Button} from 'antd';
import styled from '@emotion/styled';
import {withRouter, RouteComponentProps} from 'react-router';
import _ from 'lodash';

import {deleteFormById} from 'data';
import {GetForm} from 'data/types';

const ListItem = styled(List.Item)`
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;

  &:hover {
    background-color: #f1f1f1;
  }

  &:hover > div {
    display: flex;
  }
`;

const Container = styled.div`
  display: none;
`;

interface ActionsProps extends RouteComponentProps {
  id: number;
  getSchemeById: (id: number) => GetForm | undefined; 
  handleFilterById: (id: number) => void;
}

const ListItemActions = withRouter<ActionsProps, FC<ActionsProps>>(({
  id, history, handleFilterById, getSchemeById,
}) => {
  const handleShowClick = useCallback(() => {
    history.push(`/schemes/my/${id}`)
  }, [id, history]);

  const handleEditClick = useCallback(() => {
    const scheme = getSchemeById(id);

    if (scheme?.schema) {
      history.push('/schemes/edit', {
        id,
        scheme: scheme.schema,
      })
    }
  }, [id, getSchemeById, history]);

  const handleDeleteClick = useCallback(() => {
    deleteFormById(id)
      .then(() => handleFilterById(id))
      .catch(err => console.error(err))
  }, [id, handleFilterById]);

  return (
    <Container>
      <Button
        type="link"
        size="small"
        onClick={handleShowClick}
      >
        Посмотреть
      </Button>
      <Button
        type="link"
        size="small"
        onClick={handleEditClick}
      >
        Изменить
      </Button>
      <Button
        type="link"
        size="small"
        onClick={handleDeleteClick}
      >
        Удалить
      </Button>
    </Container>
  )
});

interface Props {
  schemes: GetForm[];
  setSchemes: (schemes: GetForm[]) => void;
}

const SchemesList: FC<Props> = ({schemes, setSchemes}) => {
  const handleFilterById = useCallback((id) => {
    const result = schemes.filter(item => item.id !== id);
    setSchemes(result);
  }, [schemes, setSchemes]);

  const getSchemeById = useCallback(id => _.find(schemes, {id: id}), [schemes]);

  return (
    <List
      bordered
      dataSource={schemes}
      renderItem={({schema, id}): ReactNode => (
        <ListItem
          key={id}
          extra={(
            <ListItemActions
              id={id}
              getSchemeById={getSchemeById}
              handleFilterById={handleFilterById}
            />
          )}
        >
          <h4>{schema.name}</h4>
        </ListItem>
      )}
    />
  );
};

export default SchemesList;
