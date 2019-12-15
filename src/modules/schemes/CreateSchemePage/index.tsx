import React, {FC, useState, useCallback, useEffect} from 'react';
import {Typography, Divider, Form, Input, Button} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {withRouter, RouteComponentProps} from 'react-router';
import {compose} from 'recompose';
import styled from '@emotion/styled';
import _ from 'lodash';

import {postForm} from 'data';
import {SchemeField} from 'data/types';
import Main from 'modules/main';
import PropertiesList from 'components/PropertiesList';

const {Title, Paragraph} = Typography;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CreateSchemePage: FC<FormComponentProps & RouteComponentProps> = ({
  form, history,
}) => {
  const {getFieldDecorator, validateFields} = form;
  const [fields, changeFields] = useState([{}]);
  const [activeKeys, setActiveKeys] = useState<string[]>(['0']);

  useEffect(() => {
    const {fields: formFields} = form.getFieldsValue();
    changeFields(formFields);
  }, [form]);

  const handleAddField = useCallback(() => {
    changeFields([...fields, {}]);
    setActiveKeys([`${fields.length}`]);
  }, [fields]);

  const handleRemoveField = useCallback((index) => {
    const formFields = form.getFieldsValue().fields;
    const result = _.filter(formFields, (item, idx) => index !== idx);

    form.setFieldsValue({
      fields: result,
    });
    changeFields(result);
  }, [form]);

  const handleChange = useCallback((values) => {
    setActiveKeys(values);
  }, [setActiveKeys]);

  const handleOpenFiledsWithErrors = useCallback((errors) => {
    let result: string[] = [];

    const fieldsErrors = _.values(errors.fields);
    fieldsErrors.forEach((item, index) => {
      if (!_.isEmpty(item)) {
        result = [...result, `${index}`]
      }
    })

    setActiveKeys(result);
  }, []);

  const handelSubmit = useCallback((e) => {
    e.preventDefault();

    validateFields((errors, values) => {
      if (!errors) {
        const fields = _.map(values.fields, (item) => (
          item.type === 'phone'
          ? {
            ...item,
            validation: {
              ...item.validation,
              pattern: `^(\\+7|8)\\s\\(\\d{1,3}\\)\\s\\d{3}-\\d{2}-\\d{2}$`
            }
          }
          : item
        ));

        const result = {
          schema: {
            name: values.name,
            fields,
          }
        };

        postForm(result)
          .then(({id}) => history.push(`/schemes/my/${id}`))
          .catch(err => console.error(err));
      } else {
        handleOpenFiledsWithErrors(errors)
      }
    })
  }, [validateFields, history, handleOpenFiledsWithErrors]);

  return (
    <Main>
      <Form
        layout="vertical"
        onSubmit={handelSubmit}
      >
        <Form.Item>
          <Title level={3}>Новая схема</Title>
        </Form.Item>
        <Form.Item
          label="Название схемы"
          wrapperCol={{span: 8}}
          required
        >
          {getFieldDecorator('name', {
            rules: [{required: true, message: 'Обязательно для заполнения'}]
          })(
            <Input
              placeholder="Укажите название схемы"
              size="large"
            />
          )}
        </Form.Item>
        <Divider />
        <Form.Item>
          <Title level={3}>Свойства схемы</Title>
          <Paragraph>Схема должна содержать хотя бы одно свойство</Paragraph>
        </Form.Item>
        <Form.Item>
          <PropertiesList
            form={form}
            fields={(fields as SchemeField[])}
            activeKeys={activeKeys}
            handleChange={handleChange}
            handleRemoveField={handleRemoveField}
          />
        </Form.Item>
        <ButtonsWrapper>
          <Button
            onClick={handleAddField}
            size="large"
          >
            Добавить новое свойство
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
          >
            Сохранить схему
          </Button>
        </ButtonsWrapper>
      </Form>
    </Main>
  );
}

export default compose<FormComponentProps & RouteComponentProps, {}>(
  withRouter,
  Form.create(),
)(CreateSchemePage);
