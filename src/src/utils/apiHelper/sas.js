import instance from '@/utils/apiHelper/axios/axiosInstance';

const Sas = {
  async getSiteMap(context, params) {
    // eslint-disable-next-line no-return-await
    return await instance.get('/api/sas/get_site_map', { params });
  },
};

export default Sas;
