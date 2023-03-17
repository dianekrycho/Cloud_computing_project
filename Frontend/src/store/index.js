import { createStore } from 'vuex'

const store = createStore({
  state: {
    token: null,
    role:null,
    locations: null,
    locationId:null,
    locationDetails: null,
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    isAdmin(state){
      if(state.role == 'admin'){ return true }
      else { return false }
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setRole(state, role) {
      state.role = role;
    },
    setLocations(state,locations){
      state.locations = locations
    },
    setLocationId(state,locationId){
      state.locationId = locationId
    },
    setLocationDetails(state,locationDetails){
      state.locationDetails = locationDetails
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setRole({ commit }, role) {
      commit('setRole', role);
    },
    setLocations({ commit }, locations) {
      commit('setLocations', locations);
    },
    setLocationId({ commit }, locationId) {
      commit('setLocationId', locationId);
    },
    setLocationDetails({ commit }, locationDetails) {
      commit('setLocationDetails', locationDetails);
    },
  },
  modules: {
  }
})
export default store