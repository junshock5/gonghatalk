import instance from './axios/axiosInstance';
import functions from "../../functions";

const User = {
  async register(body, params = null) {
    try {
      const response = await instance.post('/api/user/register', {body});
      return functions.HttpHelper.convertResult(response);
    } catch (e) {
      return functions.HttpHelper.convertError(e);
    }


  },
};

export default User;
