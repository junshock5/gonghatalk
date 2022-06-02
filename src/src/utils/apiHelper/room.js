import instance from './axios/axiosInstance';
import functions from "../../functions";

const Room = {
  async createRoom(body, params = null) {
    try {
      const response = await instance.post('/api/room/', {body});
      return functions.HttpHelper.convertResult(response);
    } catch (e) {
      return functions.HttpHelper.convertError(e);
    }
  },
  async getRoomList(context, params) {
    try {
      const response = await instance.get('/api/room/list', {params});
      return functions.HttpHelper.convertResult(response);
    } catch (e) {
      return functions.HttpHelper.convertError(e);
    }
  },
  async getMyRoomList(params) {
    try {
      const response = await instance.get('/api/room/myList', {params});
      return functions.HttpHelper.convertResult(response);
    } catch (e) {
      return functions.HttpHelper.convertError(e);
    }
  },
};

export default Room;
