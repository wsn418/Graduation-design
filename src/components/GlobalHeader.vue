<template>
  <nav class="navbar-dark bg-dark justify-content-between  px-4 mb-3">
    <div class="w-75 mx-auto navbar">
    <router-link class="navbar-brand" to="/">学习社区</router-link>
    <ul  class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="/" class="btn text-white">首页</router-link></li>
      <li class="list-inline-item"><router-link to="/home" class="btn text-white">专栏</router-link></li>
      <li class="list-inline-item"><router-link to="/nav" class="btn text-white">导航</router-link></li>
      <span v-if="!user.isLogin">
        <li class="list-inline-item"><router-link to="/login" class="btn text-white">登陆</router-link></li>
        <li class="list-inline-item"><router-link to="/signup" class="btn text-white">注册</router-link></li>
      </span>
      <span  v-else>
        <li class="list-inline-item">
        <dropdown :title="`你好 ${user.nickName}`">
          <dropdown-item closeAfterClick><router-link to="/create" class="dropdown-item">新建文章</router-link></dropdown-item>
          <dropdown-item closeAfterClick><router-link :to="`/column/${user.column}`" class="dropdown-item">我的专栏</router-link></dropdown-item>
          <dropdown-item closeAfterClick><router-link to="/edit" class="dropdown-item">编辑资料</router-link></dropdown-item>
          <dropdown-item closeAfterClick><a href="#" class="dropdown-item" @click="handleLogout">退出登陆</a></dropdown-item>
        </dropdown>
      </li>
      </span>
    </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import store, { UserProps } from '../store'
import createMessage from '../components/createMessage'
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup() {
    const router = useRouter()
    const handleLogout = () => {
      store.commit('logout')
      createMessage('退出登录成功，2秒后跳转到首页', 'success', 2000)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
    return {
      handleLogout
    }
  }
})
</script>
<style scoped>
.btn:focus, .btn:active, .btn:visited {
    outline: none;
    box-shadow: none !important;
}
</style>
