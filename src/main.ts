import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

// axios.defaults.baseURL = 'http://localhost:7001/api/'
axios.defaults.baseURL = 'http://apis.imooc.com/api/'

axios.interceptors.request.use((config) => {
  store.commit('setLoading', true)
  config.params = { ...config.params, icode: '8A6AE5F537FEDE93' }
  console.log('config', config)
  return config
})

axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 2000)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
