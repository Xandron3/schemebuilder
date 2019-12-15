import React, {
  FC, useState, useCallback, useEffect,
} from 'react';
import {Typography, Divider, Form, Input, Button} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {RouteComponentProps} from 'react-router';
import styled from '@emotion/styled';
import _ from 'lodash';

import {postFormById} from 'data';
import {SchemeField} from 'data/types';
import Main from 'modules/main';
import PropertiesList from 'components/PropertiesList';

const {Title, Paragraph} = Typography;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditSchemePage: FC<FormComponentProps & RouteComponentProps> = ({
  form, location, history
}) => {
  const {getFieldDecorator, validateFields} = form;
  const [fields, changeFields] = useState(location.state?.scheme?.fields);
  const [activeKeys, setActiveKeys] = useState<string[]>(
    _.map(fields, (item, index) => `${index}`)
  );

  useEffect(() => {
    form.setFieldsValue({fields})
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const formFields = form.getFieldsValue().fields;
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

  const handleChange = useCallback((values) => {
    setActiveKeys(values);
  }, [setActiveKeys]);

  const handelSubmit = useCallback((e) => {
    e.preventDefault();

    const id = location.state?.id;

    validateFields((errors, values) => {
      if (!errors) {
        postFormById(id, {schema: values})
          .then(() => history.push(`/schemes/my/${id}`))
          .catch(err => console.error(err));
      } else {
        handleOpenFiledsWithErrors(errors)
      }
    })
  }, [validateFields, location.state, handleOpenFiledsWithErrors, history]);

  return (
    <Main>
      <Form
        layout="vertical"
        onSubmit={handelSubmit}
      >
        <Form.Item>
          <Title level={3}>Изменить схему</Title>
        </Form.Item>
        <Form.Item
          label="Название схемы"
          wrapperCol={{span: 8}}
          required
        >
          {getFieldDecorator('name', {
            rules: [{required: true}]
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
            handleRemoveField={handleRemoveField}
            handleChange={handleChange}
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

export default Form.create<FormComponentProps & RouteComponentProps>({
  mapPropsToFields: ({location: {state}}) => ({
    name: Form.createFormField({
      value: state.scheme.name,
    })
  })
})(EditSchemePage);
