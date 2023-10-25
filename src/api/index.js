import axios from 'axios';
import router from '@/router/index'

const ErrorStatus = {
  Unauthorized: 401,
  Forbidden: 403,
  InternalServerError: 500,
};

function handleErrorResponse(status) {
  switch (status) {
    case ErrorStatus.Unauthorized:
      router.push("/auth/sign-in")
      return 'Logout or refresh token';
    case ErrorStatus.Forbidden:
      return 'Frontend developer sent data incorrectly!';
    case ErrorStatus.InternalServerError:
      return 'Internal server Error!';
    default:
      return 'Unhandled error status:';
  }
}

export const baseURL = import.meta.env.VITE_API_URL;

const ConfigApi = axios.create({
  baseURL,
});

ConfigApi.interceptors.request.use(async (config) => {
  const access = localStorage.getItem('access');
  if(access){
    config.headers = {
      Authorization: `Bearer ${access}`
    };
  }
  return await config;
});

ConfigApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error.response?.status;
    if (status) {
      handleErrorResponse(status);
    }
    return Promise.reject(error);
  }
);

export default ConfigApi;
