<template>
  <nav class="navbar-dark justify-content-between  px-4 mb-3" :class="{'bg-dark1':!isIndex1,'bg-my':isIndex1}">
    <div class="w-75 mx-auto navbar">
    <router-link class="navbar-brand" to="/">
      <div class="bg-img"> </div>
      <!-- <span class="text-white">知我</span> -->
    </router-link>
    <ul  class="list-inline mb-0" >
      <li class="list-inline-item" @click="change"><router-link to="/" class="btn text-white">首页</router-link></li>
      <li class="list-inline-item" @click="change"><router-link to="/home" class="btn text-white">专栏</router-link></li>
      <li class="list-inline-item" @click="change"><router-link to="/home" class="btn text-white">专栏</router-link></li>
      <li class="list-inline-item" @click="change"><router-link to="/nav" class="btn text-white">导航</router-link></li>
      <span v-if="!user.isLogin">
        <li class="list-inline-item" @click="change"><router-link to="/login" class="btn text-white">登陆</router-link></li>
        <li class="list-inline-item" @click="change"><router-link to="/signup" class="btn text-white">注册</router-link></li>
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
import { defineComponent, PropType, getCurrentInstance, ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
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
    const route = ref('')
    const isIndex = ref(true)
    const ctx = useRoute()
    watch(() => ctx, (newval, oldval) => {
      console.log(newval)
    })
    const change = () => {
      console.log('ctx', ctx)
      route.value = ctx.fullPath
      console.log('route', route.value)
      if (route.value === '/') {
        isIndex.value = true
      } else {
        isIndex.value = false
      }
    }
    const isIndex1 = computed(() => store.state.index)
    const router = useRouter()
    const handleLogout = () => {
      store.commit('logout')
      createMessage('退出登录成功，2秒后跳转到首页', 'success', 2000)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
    return {
      handleLogout,
      change,
      isIndex,
      isIndex1
    }
  }
})
</script>
<style scoped>
.btn:focus, .btn:active, .btn:visited {
    outline: none;
    box-shadow: none !important;
}
.bg-my {
  background-color: rgba(0, 0, 0, 0.4);
}
  .bg-img{
    width: 100px;
    height: 35px;
    background-image: url('../assets/logo2.png');
    background-position: -388px -36px;
  }
  .bg-dark1{
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
