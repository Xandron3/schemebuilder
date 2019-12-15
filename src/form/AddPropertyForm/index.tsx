import React, {FC, useMemo, useState, useCallback, useEffect} from 'react';
import styled from '@emotion/styled';
import {FormComponentProps} from 'antd/lib/form/Form';
import {
  Form as CoreForm, Input,
  Switch, Select, Icon,
} from 'antd';
import _ from 'lodash';

import TextAndPasswordValidate from './TextAndPasswordValidate';
import NumberValidate from './NumberValidate';
import {fields} from './config'

const {Item: FormItem} = CoreForm;

const Wrapper = styled.div`
  .ant-form-item-children .ant-form-item {
    margin: 0;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GeneralSection = styled.div`
  flex-basis: 35%;
`;

const ValidationSection = styled.div`
  flex-basis: 40%;
  margin-top: 32px;
`;

const CheckboxLabel = styled.span`
  margin-left: 12px;
`;

interface Props extends FormComponentProps {
  keyPrefix: string;
}

const AddPrpertyForm: FC<Props> = ({form, keyPrefix, ...props}) => {
  const [options, setOptions] = useState<object[]>(_.get(props, 'options') || [{}]);

  const type = useMemo(() => form.getFieldValue(`${keyPrefix}type`), [form, keyPrefix]);

  useEffect(() => {
    if (type === 'select') {
      form.setFieldsValue({
        [`${keyPrefix}options`]: options,
      });
    }
  // eslint-disable-next-line
  }, [options, type]);

  const handleAddOption = useCallback((e) => {
    e.target.blur();
    setOptions([...options, {}])
  }, [options]);

  const handleRemoveOption = useCallback((index) => {
    setOptions(options.filter((item, idx) => index !== idx))
  }, [options]);

  const {getFieldDecorator} = form;

  return (
    <Container>
      <GeneralSection>
        <FormItem
          label="Ключ свойства"
          required
        >
          {getFieldDecorator(`${keyPrefix}key`, {
            rules: [{required: true, message: 'Обязательно для заполнения'}]
          })(
            <Input
              placeholder="Укажите ключ свойства"
              size="large"
            />
          )}
        </FormItem>
        <FormItem
          label="Название свойства"
          required
        >
          {getFieldDecorator(`${keyPrefix}label`, {
            rules: [{required: true, message: 'Обязательно для заполнения'}]
          })(
            <Input
              placeholder="Укажите название свойства"
              size="large"
            />
          )}
        </FormItem>
        <FormItem
          label="Поле для отображения"
          required
        >
          {getFieldDecorator(`${keyPrefix}type`, {
            rules: [{required: true, message: 'Обязательно для заполнения'}]
          })(
            <Select
              placeholder="Выберите поле для отображения"
              size="large"
            >
              {fields.map(({name, type}) => (
                <Select.Option
                  key={type}
                  value={type}
                >
                  {name}
                </Select.Option>
              ))}
            </Select>
          )}
        </FormItem>
        {type === 'select' && (
          <Wrapper>
            {options.map((option, index) => (
              <FormItem
                key={index}
                wrapperCol={{span: 22, offset: 2}}
              >
                <FormItem required>
                  {getFieldDecorator(`${keyPrefix}options[${index}].key`, {
                    rules: [{required: true, message: 'Обязательно для заполнения'}]
                  })(
                    <Input
                      placeholder="Значение опции"
                      size="large"
                      suffix={options.length > 1 && (
                        <Icon
                          type="close"
                          onClick={handleRemoveOption.bind(null, index)}
                        />
                      )}
                    />
                  )}
                </FormItem>
                <FormItem required>
                  {getFieldDecorator(`${keyPrefix}options[${index}].value`, {
                    rules: [{required: true, message: 'Обязательно для заполнения'}]
                  })(
                    <Input
                      placeholder="Ключ опции"
                      size="large"
                    />
                  )}
                </FormItem>
              </FormItem>
            ))}
            <FormItem wrapperCol={{span: 22, offset: 2}}>
              <Input
                placeholder="Добавить вариант"
                size="large"
                onFocus={handleAddOption}
              />
            </FormItem>
          </Wrapper>
        )}
      </GeneralSection>
      <ValidationSection>
        <FormItem>
          {getFieldDecorator(`${keyPrefix}validation.required`, {
            valuePropName: 'checked',
          })(
            <Switch />
          )}
          <CheckboxLabel>Обязательно для заполнения</CheckboxLabel>
        </FormItem>
        {(type === 'password' || type === 'text') && (
          <TextAndPasswordValidate
            keyPrefix={keyPrefix}
            getFieldDecorator={getFieldDecorator}
          />
        )}
        {type === 'number' && (
          <NumberValidate
            keyPrefix={keyPrefix}
            getFieldDecorator={getFieldDecorator}
          />
        )}
      </ValidationSection>
    </Container>
  );
};

export default AddPrpertyForm;
