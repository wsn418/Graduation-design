<template>
  <div class="w-50 bg-white1 mx-auto mb-2 py-2">
    <el-page-header icon="el-icon-arrow-left" content="历史上的今天" @click='goback'></el-page-header>
  </div>
  <div class="w-50 bg-white1 mx-auto d-flex flex-column">
      <span class="px-2 py-2 bg-f5 text-center ml-5 mt-3 text-secondary mb-3" style="width:450px;fontSize:25px">历史上<span class="text-dark fw-bolder" style="fontWeight:700">{{currDate}}</span>都发生了什么?</span>
      <div class="d-flex mb-3 w-75 mx-auto" v-for="item in historyList" :key="item.title">
        <a :href="item.url" id="a" class="text-dark" target="_blank">
        <span class="text-nowrap" style="fontSize:25px">{{item.title}} </span>
        </a>
      </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
export default defineComponent({
  name: 'Calendar',
  setup() {
    const historyList = ref()
    const currDate = ref()
    const Day = new Date()
    const goback = function() {
      this.$router.go(-1)
    }
    currDate.value = (Day.getMonth() + 1) + '月' + (Day.getDate()) + '日'
    const init = () => {
      axios.get('/application').then(data => {
        console.log(data.data.data.history)
        historyList.value = data.data.data.history
      })
    }
    onMounted(() => {
      init()
    })
    return {
      historyList,
      currDate,
      goback
    }
  }
})

</script>
<style scoped>

.bg-f5 {
  background-color: #F5F5F5;
}

#a {
  text-decoration: none;
  color: none;
}
</style>
