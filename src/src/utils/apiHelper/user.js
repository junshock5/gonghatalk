import instance from './axios/axiosInstance';

const User = {
  async register(body) {
    // eslint-disable-next-line no-return-await
    return await instance.post('/api/user/register', body);
  },
};

export default User;
