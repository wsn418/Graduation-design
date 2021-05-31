<template>
   <div class="w-50 bg-white1 mx-auto mb-2 py-2">
    <el-page-header icon="el-icon-arrow-left" content="垃圾分类" @click='goback'></el-page-header>
  </div>
  <div class="w-50 bg-white1 mx-auto py-3">
    <h1 class="mb-3 ml-3">垃圾分类查询</h1>
    <div>
      <div class="d-flex justify-content-center mb-3">
        <el-input style="width:400px" class="mr-3" v-model="ipt" placeholder="请输入垃圾名称"  @keyup.enter="getGarbageClass()">></el-input> <el-button type="primary" @click="getGarbageClass()">查询</el-button>
      </div>
      <div class="d-flex flex-column">
        <!-- {{arr}} -->
            <div v-for="item in arr" :key="item.name" class="d-flex mx-auto border-bottom mb-2 align-items-center" style="width:500px">
              <div class="mr-2 center" style="fontSize:25px;width:300px;">{{item.name}}</div>
              <span style="fontSize:20px;" v-if="item.category == 1" class="text-success">可回收垃圾</span>
              <span style="fontSize:20px" v-if="item.category == 2" class="text-danger">有害垃圾</span>
              <span style="fontSize:20px" v-if="item.category == 4">湿垃圾</span>
              <span style="fontSize:20px" v-if="item.category == 8" class="text-info">干垃圾</span>
              <span style="fontSize:20px" v-if="item.category == 6">大件垃圾</span>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import axios from 'axios'
export default defineComponent({
  name: 'GarbageClass',
  setup() {
    const ipt = ref('')
    const arr = ref('')
    const getGarbageClass = () => {
      axios.get(`/application/garbage?name=${ipt.value}`).then(data => {
        console.log(data.data.data)
        arr.value = data.data.data
      })
    }
    const goback = function() {
      this.$router.go(-1)
    }
    return {
      ipt,
      arr,
      getGarbageClass,
      goback
    }
  }
})
</script>
