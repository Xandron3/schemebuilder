import axios from 'axios';
import config from 'config';

const AUTH_TOKEN_NAME = 'auth_token';
const AUTH_HEADER_NAME = 'Authorization';

axios.defaults.baseURL = config.dataURL;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const setToken = (token: string): void => {
  axios.defaults.headers.common[AUTH_HEADER_NAME] = token;
  localStorage.setItem(AUTH_TOKEN_NAME, token);
};

const getToken = (): string | void => (
  axios.defaults.headers.common[AUTH_HEADER_NAME]
  || localStorage.getItem(AUTH_TOKEN_NAME)
);

const deleteToken = (): void => {
  delete axios.defaults.headers.common[AUTH_HEADER_NAME];
  localStorage.removeItem(AUTH_TOKEN_NAME);
};

axios.defaults.headers.common[AUTH_HEADER_NAME] = getToken();

const getJson = <T>(url: string, params?: object, options?: object): Promise<T> => (
  axios.get(url, {params, ...options})
    .then(res => res.data)
    .catch((err) => console.error(err))
);

const postJson = <T>(url: string, data?: object, params?: object, options?: object): Promise<T> => (
  axios.post(url, data, {params, ...options})
    .then(res => res.data)
    .catch((err) => console.error(err))
);

const putJson = <T>(url: string, data?: object, params?: object): Promise<T> => (
  axios.put(url, data, {params})
    .then(res => res.data)
    .catch((err) => console.error(err))
);

const deleteJson = <T>(url: string, params?: object, options?: object): Promise<T> => (
  axios.delete(url, {params, ...options})
    .then(res => res.data)
    .catch((err) => console.error(err))
);

export {
  setToken,
  getToken,
  deleteToken,

  getJson,
  postJson,
  putJson,
  deleteJson,
}
