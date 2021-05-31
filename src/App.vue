<template>
    <el-scrollbar>
    <div class="container-fluid px-0 flex-shrink-0">
      <global-header :user="currentUser"></global-header>
      <loader v-if="isLoading"></loader>
      <router-view></router-view>
    </div>
   </el-scrollbar>
    <!-- <footer class="text-center py-4 text-secondary bg-my mt-auto" :class="{'bg-white':!isIndex1,'bg-my':isIndex1}">
    <small>
      <ul class="list-inline mb-0">
        <li class="list-inline-item" :class="{'text-white' : isIndex1}">© 学习社区 </li>
      </ul>
    </small>
    </footer> -->

</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, getCurrentInstance, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import Loader from './components/Loader.vue'
import createMessage from './components/createMessage'

import { GlobalDataProps } from './store'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  setup() {
    const ctx = useRoute()
    watch(() => ctx, (newval, oldval) => {
      console.log(newval)
    })
    // const ctx = useRoute()
    // console.log('ctx', ctx)
    // const router = ref('')
    // const { ctx } = getCurrentInstance()
    // router.value = ctx.$router.currentRoute.value.path
    // console.log(ctx.$router.currentRoute.value)
    const store = useStore<GlobalDataProps>()
    const isIndex1 = computed(() => store.state.index)
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
      }
    })
    return {
      currentUser,
      isLoading,
      error,
      isIndex1
      // router
    }
  }
})
</script>

<style scoped>
.bg-my {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}
</style>
