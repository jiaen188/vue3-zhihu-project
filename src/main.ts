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
  return config
})

axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
