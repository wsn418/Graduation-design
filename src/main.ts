import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:7001/api/' : 'http://api.vikingship.xyz/api/'
// axios.interceptors.request.use(config => {
//   store.commit('setLoading', true)
//   store.commit('setError', { status: false, message: '' })
//   return config
// })

// axios.interceptors.response.use(config => {
//   store.commit('setLoading', false)
//   return config
// }, e => {
//   const { error } = e.response.data
//   store.commit('setError', { status: true, message: error })
//   store.commit('setLoading', false)
//   return Promise.reject(e.response.data)
// })
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  store.commit('setError', { status: false })
  store.commit('setLoading', true)
  config.params = { ...config.params, icode: 'B83F40E1F756741B' }
  if (config.data instanceof FormData) {
    config.data.append('icode', 'B83F40E1F756741B')
  } else {
    config.data = { ...config.data, icode: 'B83F40E1F756741B' }
  }
  return config
})
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(e.response.data)
})
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
