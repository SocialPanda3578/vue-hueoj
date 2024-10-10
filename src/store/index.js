import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
    userType: null,
    username: null,
    userID: null,
    lastLoginTime: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserType(state, userType) {
      state.userType = userType;
    },
    setUsername(state, username) {
      state.username = username;
    },
    setUserID(state, userID) {
      state.userID = userID;
    },
    setLastLoginTime(state, timestamp) {
      state.lastLoginTime = timestamp;
    },
  },
  actions: {
    saveStateToLocalStorage({ state }) {
      localStorage.setItem("vuexState", JSON.stringify(state));
    },
    loadStateFromLocalStorage({ commit }) {
      try {
        const savedState = localStorage.getItem("vuexState");
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          const now = new Date().getTime();
          const lastLoginTime = parsedState.lastLoginTime;
          if (
            lastLoginTime &&
            now - lastLoginTime <= 10 * 24 * 60 * 60 * 1000
          ) {
            commit("setToken", parsedState.token);
            commit("setUserType", parsedState.userType);
            commit("setUsername", parsedState.username);
            commit("setUserID", parsedState.userID);
            commit("setLastLoginTime", lastLoginTime);
          } else {
            localStorage.removeItem("vuexState");
          }
        }
      } catch (e) {
        console.error("Failed to parse local storage state:", e);
      }
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUserType(state) {
      return state.userType;
    },
    getUsername(state) {
      return state.username;
    },
    getUserID(state) {
      return state.userID;
    },
    getLastLoginTime(state) {
      return state.lastLoginTime;
    },
    isTokenExpired(state) {
      const now = new Date().getTime();
      const lastLoginTime = state.lastLoginTime;
      return !lastLoginTime || now - lastLoginTime > 10 * 24 * 60 * 60 * 1000;
    },
  },
});
