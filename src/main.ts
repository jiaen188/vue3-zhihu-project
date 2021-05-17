import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

// axios.defaults.baseURL = 'http://localhost:7001/api/'
axios.defaults.baseURL = 'http://apis.imooc.com/api/'

axios.interceptors.request.use((config) => {
  store.commit('setLoading', true)
  // get 请求，添加到url中
  config.params = { ...config.params, icode: 'E66224C8EBE43783' }
  // 其他请求，添加到body中
  // 如果是上传文件，添加到 FormData中
  if (config.data instanceof FormData) {
    config.data.append('icode', 'E66224C8EBE43783')
  } else {
    // 普通的body 对象，添加到 data中
    config.data = { ...config.data, icode: 'E66224C8EBE43783' }
  }
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
