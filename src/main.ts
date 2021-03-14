import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

// axios.defaults.baseURL = 'http://localhost:7001/api/'
axios.defaults.baseURL = 'http://apis.imooc.com/api/'

axios.interceptors.request.use((config: { params: any }) => {
  config.params = { ...config.params, icode: 'C6A6C4086133360B' }
  return config
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
