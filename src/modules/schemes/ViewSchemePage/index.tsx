import React, {FC, useEffect, useState, useCallback} from 'react';
import {Card, Typography, Form, Button as CoreButton, Alert, Skeleton} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {RouteComponentProps} from 'react-router';
import styled from '@emotion/styled';
import _ from 'lodash';

import {getFormById} from 'data';
import {SchemeData} from 'data/types';
import Main from 'modules/main';
import Field from './Field';

const Button = styled(CoreButton)`
  width: 100%;
`;

const {Title} = Typography;

const ViewSchemePage: FC<RouteComponentProps & FormComponentProps> = ({
  match, form, 
}) => {
  const [scheme, setScheme] = useState<SchemeData>();
  const [formErrors, setFormErrors] = useState();
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    const id = _.get(match.params, 'id');

    getFormById(id)
      .then(({schema}) => setScheme(schema))
      .catch(err => console.error(err))
      .finally(() => setFetching(false))
  }, [match]);

  const handleValidateFields = useCallback(() => {
    form.validateFields((errors) => {
      if (errors) {
        setFormErrors(errors);
      } else {
        setFormErrors({})
      }
    })
  }, [form]);

  return (
    <Main>
      <Card>
      {isFetching && <Skeleton active />}
      {!scheme && !isFetching && <h3>Не удается загрузить схему</h3>}
      {scheme && (
        <Form
          layout="vertical"
        >
          <Form.Item>
            <Title level={4}>{scheme.name}</Title>
          </Form.Item>
          {scheme.fields.map((field) => (
            <Field
              key={field.key}
              field={field}
              form={form}
            />
          ))}
          <Form.Item wrapperCol={{span: 12}}>
            <Button
              type="primary"
              size="large"
              onClick={handleValidateFields}
            >
              Валидация
            </Button>
          </Form.Item>
          {formErrors && (
            <Form.Item wrapperCol={{span: 12}}>
              {!_.isEmpty(formErrors)
                ? <Alert message="Валидация не пройдена" type="error" showIcon />
                : <Alert message="Валидация пройдена успешно" type="success" showIcon />
              }
            </Form.Item>
          )}
        </Form>
      )}
      </Card>
    </Main>
  );
};

export default Form.create()(ViewSchemePage);
