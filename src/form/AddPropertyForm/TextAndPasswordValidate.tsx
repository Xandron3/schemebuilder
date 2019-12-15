import React, {FC, ReactNode} from 'react';
import {Form, Input, InputNumber as CoreInputNumber} from 'antd';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CountFieldsWrapper = styled.div`
  display: flex;

  .ant-form-item {
    flex-grow: 1;
  }

  .ant-form-item:first-of-type {
    margin-right: 4px;
  }

  .ant-form-item:last-of-type {
    margin-left: 4px;
  }
`;

const InputNumber = styled(CoreInputNumber)`
  width: 100%;
`;

interface Props {
  keyPrefix: string;
  getFieldDecorator: (name: string, options?: object) => (node: ReactNode) => ReactNode;
}

const TextAndPasswordValidate: FC<Props> = ({
  getFieldDecorator, keyPrefix,
}) => (
  <Container>
    <CountFieldsWrapper>
      <Form.Item label="Мин. кол-во символов">
        {getFieldDecorator(`${keyPrefix}validation.min`)(
          <InputNumber size="large" />
        )}
      </Form.Item>
      <Form.Item label="Макс. кол-во символов">
        {getFieldDecorator(`${keyPrefix}validation.max`)(
          <InputNumber size="large" />
        )}
      </Form.Item>
    </CountFieldsWrapper>
    <Form.Item label="Шаблон ввода">
      {getFieldDecorator(`${keyPrefix}validation.pattern`)(
        <Input size="large" />
      )}
    </Form.Item>
  </Container>
);

export default TextAndPasswordValidate;
