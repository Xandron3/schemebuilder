import React, {FC, useCallback} from 'react';
import styled from '@emotion/styled';
import {FormComponentProps} from 'antd/lib/form/Form';
import {
  Card as CoreCard, Form as CoreForm,
  Typography, Input, Button,
} from 'antd';
import {compose} from 'recompose';
import {withRouter, RouteComponentProps} from 'react-router';
import _ from 'lodash';

import {postLogin, setToken} from 'data';
import {ReactComponent as Logo} from 'assets/sibdev-logo.svg';

const {Title: CoreTitle} = Typography;
const {Item: FormItem} = CoreForm;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled(CoreCard)`
  width: 500px;
  height: 500px;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Form = styled(CoreForm)`
  width: 330px;
`;

const Title = styled(CoreTitle)`
  margin-top: 32px;
`;

const ButtonsWrapper = styled(FormItem)`
  display: flex;
  justify-content: center;
`;

const LoginPage: FC<FormComponentProps & RouteComponentProps> = ({
  form, history,
}) => {
  const {getFieldDecorator, validateFields} = form;

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    validateFields((errors, values) => {
      if (!errors) {
        postLogin(values)
          .then((token) => {
            const accessToken = _.get(token, 'access_token');

            if (accessToken) {
              setToken(`bearer ${accessToken}`);
              history.push('/schemes/my');
            }
          })
          .catch(err => console.error(err))
      }
    })
  }, [validateFields, history]);

  return (
    <Container>
      <Card>
        <Logo width="80" />
        <Title level={4}>Вход</Title>
        <Form
          onSubmit={handleSubmit}
          layout="vertical"
        >
          <FormItem label="Логин">
            {getFieldDecorator('username', {
            rules: [{required: true}]
          })(
              <Input size="large" />
            )}
          </FormItem>
          <FormItem label="Пароль">
            {getFieldDecorator('password', {
            rules: [{required: true}]
          })(
              <Input.Password size="large" />
            )}
          </FormItem>
          <ButtonsWrapper>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
            >
              Войти
            </Button>
          </ButtonsWrapper>
        </Form>
      </Card>
    </Container>
  );
}

export default compose<FormComponentProps & RouteComponentProps, {}>(
  withRouter,
  CoreForm.create(),
)(LoginPage);
