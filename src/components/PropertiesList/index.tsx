import React, {FC} from 'react';
import {FormComponentProps} from 'antd/lib/form/Form';
import {Collapse as CoreCollapse, Typography, Icon} from 'antd';
import styled from '@emotion/styled';
import _ from 'lodash';

import {fields as optionFields} from 'form/AddPropertyForm/config';
import {SchemeField} from 'data/types'; 
import AddPropertyForm from 'form/AddPropertyForm';

const {Panel} = CoreCollapse;
const {Title, Paragraph} = Typography;

const Collapse = styled(CoreCollapse)`
  .ant-collapse-header {
    display: flex;
  }
`;

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

interface HeaderProps {
  fieldKey: string;
  index: number;
  label: string;
  type: string;
}

const Header: FC<HeaderProps> = ({type, fieldKey, label, index}) => {
  const optionFieldName = _.get(_.find(optionFields, {type: type}), 'name');

  return (
    <Container>
      <Title level={4}>Свойство {index + 1}: {label}</Title>
      <Paragraph>{optionFieldName}{fieldKey && `; ${fieldKey}`}</Paragraph>
    </Container>
  )
}

interface Props extends FormComponentProps {
  fields: SchemeField[];
  activeKeys: string[];
  handleChange: (keys: string[] | string) => void;
  handleRemoveField: (index: number) => void;
}

const PropertiesList: FC<Props> = ({
  fields, form, activeKeys, handleChange,
  handleRemoveField,
}) => (
  <Collapse
    bordered={false}
    activeKey={activeKeys}
    onChange={handleChange}
  >
    {fields.map(({type, label, key, ...props}, index) => (
      <Panel
        header={
          <Header
            type={type}
            fieldKey={key}
            label={label}
            index={index}
          />
        }
        extra={fields.length > 1 && (
          <Icon
            type="delete"
            onClick={handleRemoveField.bind(null, index)}
          />
        )}
        key={index}
      >
        <AddPropertyForm
          form={form}
          keyPrefix={`fields[${index}].`}
          {...props}
        />
      </Panel>
    ))}
  </Collapse>
);

export default PropertiesList;
