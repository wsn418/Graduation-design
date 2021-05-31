<template>
  <div>
    <h1>动漫查找</h1>
    <div>
      <el-input v-model="ipt"> </el-input>
      <el-button @click="search">查找</el-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import axios from 'axios'
export default defineComponent({
  name: 'Anime',
  setup() {
    const ipt = ref('')
    const search = async() => {
      const { data } = await axios.get(`/application/anime?name=${ipt.value}`)
      console.log(data)
    }
    return {
      ipt,
      search
    }
  }
})
</script>
