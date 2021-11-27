// State management
import Vuex from "vuex";
import VuexPersist from "vuex-persistedstate";
import createPersistedState from "vuex-persistedstate";

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: null,
      user: "",
      authenticated: false,
      loading: true,
      edit: "",
      contacts: "",
    },
    mutations: {
      SET_TOKEN: (state, token) => {
        state.token = token;
        state.authenticated = true;
        state.loading = false;
        localStorage.setItem("token", token);
      },
      SET_USER: (state, user) => {
        state.user = user;
      },
      SET_EDIT: (state, edit) => {
        state.edit = edit;
      },
      SET_CONTACTS: (state, contacts) => {
        state.contacts = contacts;
      },
      RESET_STATE: (state) => {
        state.token = "";
        state.user = "";
        state.authenticated = false;
      },
      LOG_OUT: (state) => {
        state.token = null;
        state.user = "";
        state.edit = "";
        state.loading = false;
        state.authenticated = false;
        state.contacts = "";

        localStorage.removeItem("token");
      },
    },
    actions: {
      setToken({ commit }, token) {
        commit("SET_TOKEN", token);
      },
      setUser({ commit }, user) {
        commit("SET_USER", user);
      },
      setEdit({ commit }, edit) {
        commit("SET_EDIT", edit);
      },
      setContacts({ commit }, contacts) {
        commit("SET_CONTACTS", contacts);
      },

      resetState({ commit }) {
        commit("RESET_STATE");
      },
      LogOut({ commit }) {
        commit("LOG_OUT");
      },
    },
    getters: {
      token: (state) => state.token,
      user: (state) => state.user,
      authenticated: (state) => state.authenticated,
      loading: (state) => state.loading,
      edit: (state) => state.edit,
      contacts: (state) => state.contacts,
    },
    // plugins: [createPersistedState()],
    // plugins: [
    //   VuexPersist({
    //     storage: window.sessionStorage,
    //   }),
    // ],
  });
};

export default createStore;
