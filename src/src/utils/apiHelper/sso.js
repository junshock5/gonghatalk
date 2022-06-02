import functions from '@/utils/functions';
import instance from './axios/axiosInstance';

const Sso = {
  // eslint-disable-next-line consistent-return,no-unused-vars
  isLogin(callback) {
    // eslint-disable-next-line no-unused-vars
    try {
      let xhr;
      // eslint-disable-next-line prefer-const
      xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://dev-nxas.nexon.com/CheckLogin');
      xhr.withCredentials = true;
      // eslint-disable-next-line consistent-return
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          callback(JSON.parse(xhr.responseText));
        }
      };
      xhr.send(); // 요청 전송
    } catch (e) {
      return functions.HttpHelper.convertError(e);
    }
  },
  async Logout() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dev-nxas.nexon.com/Logout');
    xhr.withCredentials = true;
    // eslint-disable-next-line consistent-return
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // console.log('SSO 로그아웃 완료');
        // eslint-disable-next-line no-undef
        window.location.assign(`${SSO_URL}/api/auth/authorize?response_type=code&client_id=${SSO_CLIENT_ID}`);
      }
    };
    xhr.send();
  },
  getAccessToken(context, params) {
    return instance.post('/api/sso/get_access_token', params);
  },
  getUserData(params) {
    return instance.get('/api/sso/get_user_data', { params });
  },
  async checkUserData(params) {
    const result = await instance.get('/api/sso/check_user_data', { params });
    return result;
  },
};

export default Sso;
