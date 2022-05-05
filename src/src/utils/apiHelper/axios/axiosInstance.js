import axios from 'axios';
import store from '../../../store/index';

const instance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: ``,
});

instance.interceptors.request.use(
  (config) => {
    if (store.state.currentUserService != null) {
      // eslint-disable-next-line no-param-reassign
      config.headers.serviceCode = store.state.currentUserService.serviceCode;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Test 용 콘솔 로그 (api 콜 때 에러 발생)
    // eslint-disable-next-line no-console
    console.log('api call response has error');
    try {
      // Test 용 콘솔 로그 (api 콜 때 에러 발생)
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(error, null, 2));
    } catch (e) {
      // Do nothing
      // console.log 중 에러 발생 대비 (기존 로직에 영향 없도록)
    }
    if (error.message === 'Network Error') {
      // Test 용 콘솔 로그 (새로고침 발동)
      // eslint-disable-next-line no-console
      console.log('before logout');
      const araHost = document.location.origin;
      const callbackUrl = encodeURIComponent(window.location.href);
      window.location.replace(`${araHost}/auth/logout?returnUrl=${callbackUrl}`);
    }
    return Promise.reject(error);
  },
);

export default instance;
