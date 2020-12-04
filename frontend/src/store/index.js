// Built with guidance from the following article:
// https://www.digitalocean.com/community/tutorials/handling-authentication-in-vue-using-vuex

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('jwt') || '',
    user: {}
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post('http://localhost:3000/users', user)
        .then(res => {
          const token = res.data.token
          const user = res.data.user
          localStorage.setItem('jwt', token)
          commit('auth_success', token, user)
          resolve(res)
        })
        .catch(error => {
          commit('auth_error', error)
          localStorage.removeItem('jwt')
          reject(error)
        })
      })
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post('http://localhost:3000/users/login', user)
        .then(res => {
          const token = res.data.token
          const user = res.data.user
          localStorage.setItem('jwt', token)
          commit('auth_success', token, user)
          resolve(res)
        })
        .catch(error => {
          commit('auth_error', error)
          localStorage.removeItem('jwt')
          reject(error)
        })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('jwt')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  modules: {
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user
  }
})
