import React, {FC, useMemo} from 'react';
import {
  Input as CoreInput, InputNumber as CoreInputNumber,
  Checkbox, Select, Form,
} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import styled from '@emotion/styled';
import _ from 'lodash';

import {SchemeField} from 'data/types';

const CheckboxLabel = styled.span`
  margin-left: 12px;
`;

const InputNumber = styled(CoreInputNumber)`
  width: 100%;
`;

const components = {
  text: CoreInput,
  number: InputNumber,
  password: CoreInput.Password,
  checkbox: Checkbox,
  phone: CoreInput,
  select: Select
}

interface Props extends FormComponentProps {
  field: SchemeField;
}

const Field: FC<Props> = ({field, form}) => {
  const isCheckbox = field.type === 'checkbox';
  const Component = _.get(components, field.type);
  const {getFieldDecorator} = form;

  const validationRules = useMemo(() => (
    _.map(field.validation, (value, key) => (
      {[key]: value}
    ))
  ), [field]);

  return (
    <Form.Item
      key={field.key}
      label={!isCheckbox && field.label}
      wrapperCol={{span: 12}}
    >
      {getFieldDecorator(field.key, {
        valuePropName: isCheckbox ? 'checked' : 'value',
        rules: validationRules,
      })(
        field.type !== 'select'
          ? (
            <Component
              placeholder={`Введите ${field.label}`}
              size="large"
            />
          )
          : (
            <Component
              placeholder={`Введите ${field.label}`}
              size="large"
            >
              {field.options?.map((option) => (
                <Select.Option
                  key={option.key}
                  value={option.value}
                >
                  {option.key}
                </Select.Option>
              ))}
            </Component>
          )
      )}
      {isCheckbox && <CheckboxLabel>{field.label}</CheckboxLabel>}
    </Form.Item>
  )
};

export default Field;
