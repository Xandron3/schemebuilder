import {UserData} from './';

export interface SchemeField {
  key: string;
  label: string;
  type: string;
  validation?: {
    required?: boolean;
    min?: string;
    max?: string;
    pattern?: string;
  };
  options?: Array<{
    key: string;
    value: string;
  }>;
}

export interface SchemeData {
  name: string;
  fields: SchemeField[];
}

export interface PostFormRequest {
  schema: SchemeData;
}

export interface PostFormResponse {
  user: UserData;
  schema: SchemeData;
  id: number;
}

export interface GetForm {
  id: number;
  schema: SchemeData;
}
