import {getJson, postJson, deleteJson} from './ajax';
import {PostFormResponse, PostFormRequest, GetForm} from './types';

const FORM_URL = 'form';

const postForm = (data: PostFormRequest): Promise<PostFormResponse> => (
  postJson<PostFormResponse>(FORM_URL, data)
);

const getForms = (): Promise<GetForm[]> => (
  getJson<GetForm[]>(FORM_URL)
);

const postFormById = (id: number, data: PostFormRequest): Promise<object> => (
  postJson<object>(`${FORM_URL}/${id}`, data)
);

const getFormById = (id: number): Promise<GetForm> => (
  getJson<GetForm>(`${FORM_URL}/${id}`)
);

const deleteFormById = (id: number): Promise<{}> => (
  deleteJson(`${FORM_URL}/${id}`)
);

export {
  postForm,
  getForms,
  postFormById,
  getFormById,
  deleteFormById,
}
