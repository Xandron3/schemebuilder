import {getJson} from './ajax';
import {UserData} from './types';

const USERS_URL = 'users';
const USERS_PROFILE_URL = `${USERS_URL}/profile`;

const getUser = (): Promise<UserData> => (
  getJson<UserData>(USERS_PROFILE_URL)
);

export {
  getUser,
}
