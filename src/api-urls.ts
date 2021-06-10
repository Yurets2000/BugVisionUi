import {environment} from './environments/environment';

export const apiUrls = {
  AUTH_API_URL: environment.BASE_API_URL + '/auth',
  USER_API_URL: environment.BASE_API_URL + '/users',
  CLASSIFICATION_API_URL: environment.BASE_API_URL + '/classification'
};
