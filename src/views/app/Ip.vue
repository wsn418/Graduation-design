<template>
   <div class="w-50 bg-white1 mx-auto mb-2 py-2">
    <el-page-header icon="el-icon-arrow-left" content="IP信息查询" @click='goback'></el-page-header>
  </div>
  <div class="w-50 bg-white1 mx-auto py-2 px-5">
    <h1 class="text-center mt-3">IP信息查询</h1>
    <div class="text-center my-3">
      <el-input style="width:300px" class="mr-3" v-model="ipt" @keyup.enter='getIpdata'></el-input><el-button type="primary" @click="getIpdata">查询</el-button>
    </div>
    <div>
      <h3>您的ip信息</h3>
      <div class="mt-3 mb-3">
        <div class="w-75 mx-auto d-flex">
          <p class="mr-2">ip地理信息:</p>
          <p>{{data}}</p>
        </div>
          <div class="w-75 mx-auto d-flex">
          <p class="mr-2">运营商:</p>
          <p>{{ips}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
export default defineComponent({
  setup() {
    const dataMap = reactive({
      data: '',
      ipt: '',
      ips: ''
    })
    const getIpdata = async() => {
      const { data } = await axios.get(`/application/getIpInfo?ip=${dataMap.ipt}`)
      console.log(data)
      if (data.data) {
        dataMap.data = data.data.slice(0, 4).join(' ')
        dataMap.ips = data.data[4]
      } else {
        ElMessage.error('你输入的ip有误,请重新输入')
      }
    }
    const goback = function() {
      this.$router.go(-1)
    }
    return { ...toRefs(dataMap), getIpdata, goback }
  }
})

</script>
