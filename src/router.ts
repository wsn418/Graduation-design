import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import Qrcode from './views/app/Qrcode.vue'
import PostDetail from './views/PostDetail.vue'
import EditProfile from './views/EditProfile.vue'
import IndexPage from './views/IndexPage.vue'
import Index from './views/Index.vue'
import Relationship from './views/app/Relationship.vue'
import GarbageClass from './views/app/GarbageClass.vue'
import IdentAttr from './views/app/IdentAttr.vue'
import Weather from './views/app/Weather.vue'
import Ip from './views/app/Ip.vue'
import Encode from './views/app/Encode.vue'
import Anime from './views/app/Anime.vue'
import NumCase from './views/app/NumCase.vue'
import Calendar from './views/app/Calendar.vue'
import News from './views/app/News.vue'
import NavQuick from './views/NavQuick.vue'
import Error from './views/Error.vue'
import store from './store'
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      component: Qrcode
    },
    {
      path: '/Relationship',
      name: 'Relationship',
      component: Relationship
    },
    {
      path: '/GarbageClass',
      name: 'GarbageClass',
      component: GarbageClass
    },
    {
      path: '/Anime',
      name: 'Anime',
      component: Anime
    },
    {
      path: '/Ip',
      name: 'Ip',
      component: Ip
    },
    {
      path: '/Encode',
      name: 'Encode',
      component: Encode
    },
    {
      path: '/Weather',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/IdentAttr',
      name: 'IdentAttr',
      component: IdentAttr
    },
    {
      path: '/Calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/NumCase',
      name: 'NumCase',
      component: NumCase
    },
    {
      path: '/News',
      name: 'News',
      component: News
    },
    {
      path: '/nav',
      name: 'nav',
      component: NavQuick
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: { requiredLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: PostDetail
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditProfile,
      meta: { requiredLogin: true }
    },
    {
      path: '/:pathMatch(.*)',
      name: 'error',
      component: Error
    }
  ]
})
router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  console.log('to', to.fullPath)
  if (to.fullPath === '/') {
    store.commit('setIndex', true)
  } else {
    store.commit('setIndex', false)
  }
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.error(e)
        store.commit('logout')
        next('login')
      })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
