import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mainInfo: null,
    educationInfo: null,
    jobInfo: null,
    githubUser: null,
  },
  mutations: {
    saveMainInfo(state, obj) {
      state.mainInfo = obj;
    },
    educationInfo(state, obj) {
      state.educationInfo = obj;
    },
    jobUserInfo(state, arr) {
      state.jobInfo = arr;
      console.log(arr)
    },
    addUserGithub(state, obj) {
      state.githubUser = obj;
    }
  },
  getters: {
  },
  actions: {
  },
});
