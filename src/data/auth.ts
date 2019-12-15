import {postJson} from './ajax';
import {AuthData, LoginDataResponse, UserData} from './types';

const AUTH_URL = 'auth';
const AUTH_LOGIN_URL = `${AUTH_URL}/login`;
const AUTH_SIGNUP_URL = `${AUTH_URL}/signup`;

const postLogin = (data: AuthData): Promise<LoginDataResponse> => (
  postJson<LoginDataResponse>(AUTH_LOGIN_URL, data)
);

const postSignup = (data: AuthData): Promise<UserData> => (
  postJson<UserData>(AUTH_SIGNUP_URL, data)
);

export {
  postLogin,
  postSignup,
}
