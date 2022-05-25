import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import ApiHelper from '@/utils/apiHelper';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [{
      id: 1,
      name: 'itemName',
      code: 'item-1',
    }, {
      id: 2,
      name: 'itemName2',
      code: 'item-2',
    }],
    user: null,
    tags: null,
    tradeItems: [{
      id: 1,
      name: 'itemName',
      code: 'item-1',
    }, {
      id: 2,
      name: 'itemName2',
      code: 'item-2',
    }],
    restrictionTradeItems: [{
      id: 1,
      code: 'item-1',
    }, {
      id: 2,
      code: 'item-2',
    }],
    cabinetItems: [{
      id: 1,
      name: 'itemName',
      code: 'item-1',
    }, {
      id: 2,
      name: 'itemName2',
      code: 'item-2',
    }],
    authCode: '',
    userData: {},
  },
  getters: {
    getItems: (state) => state.items,
    getItem: (state) => (code) => state.items.filter((item) => item.code === code)[0],
    getTags: (state) => state.tags,
    searchTag: (state) => (word) => {
      const regex = new RegExp((word));
      return state.tags.filter((tag) => regex.test(tag.name));
    },
    isAdmin: (state) => state.user !== null && state.user.isAdmin,
    isLoggedIn: (state) => state.user !== null,
    getTradeItems: (state) => state.tradeItems,
    getTradeItem: (state) => (code) => state.tradeItems.filter((item) => item.code === code)[0],
    getRestrictionTradeItems: (state) => state.restrictionTradeItems,
    getRestrictionTradeItem: (state) => (code) => state.restrictionTradeItems
      .filter((item) => item.code === code)[0],
    getCabinetItems: (state) => state.cabinetItems,
    getCabinetItem: (state) => (code) => state.cabinetItems.filter((item) => item.code === code)[0],
    authCode: (state) => state.authCode,
    userData: (state) => state.userData,
  },
  mutations: {
    getItemsFromApi: (state, result) => {
      // eslint-disable-next-line no-param-reassign
      state.items = result;
    },
    getTagsFromApi: (state, result) => {
      // eslint-disable-next-line no-param-reassign
      state.tags = result;
    },
    signIn: (state, result) => {
      // eslint-disable-next-line no-param-reassign
      state.user = result;
    },
    signOut: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.user = null;
    },
    getTradeItemsFromApi: (state, result) => {
      // eslint-disable-next-line no-param-reassign
      state.tradeItems = result;
    },
    getRestrictionTradeItemsFromApi: (state, result) => {
      // eslint-disable-next-line no-param-reassign
      state.restrictionTradeItems = result;
    },
    getCabinetItemsFromApi: (state, result) => {
      // eslint-disable-next-line no-param-reassign
      state.cabinetItems = result;
    },
    setAuthCode: (state, result) => {
      // eslint-disable-next-line no-param-reassign
      state.authCode = result;
    },
    setUserData: (state, result) => {
      // eslint-disable-next-line no-param-reassign
      state.userData = result;
    },
  },
  actions: {
    async signIn(context, params) {
      const result = await axios.get('/api/simple_signin', { params });
      context.commit('signIn', result.data);
    },
    async signOut() {
      // context.commit('signOut');
    },
    async getItemFromApi(context, params) {
      const result = await axios.get('/api/simple_items', { params });
      context.commit('getItemsFromApi', result.data);
    },
    async getTradeItemFromApi(context, params) {
      const result = await axios.get('/api/trade/simple_trade_items', { params });
      context.commit('getTradeItemsFromApi', result.data);
    },
    async getRestrictionTradeItemFromApi(context, params) {
      const result = await axios.get('/api/restriction/simple_restriction_trade_items', { params });
      context.commit('getRestrictionTradeItemsFromApi', result.data);
    },
    async getCabinetItemFromApi(context, params) {
      const result = await axios.get('/api/cabinet/simple_cabinet_items', { params });
      context.commit('getCabinetItemsFromApi', result.data);
    },
    async setUserData(context, params) {
      context.commit('setUserData', params);
    },
  },
  modules: {},
});
