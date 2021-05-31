<template>
   <div class="w-50 bg-white1 mx-auto mb-2 py-2">
    <el-page-header icon="el-icon-arrow-left" content="今日要闻" @click='goback'></el-page-header>
  </div>
   <div class="w-50 bg-white1 mx-auto d-flex flex-column py-3 px-3">
      <div class="">
        <el-button type="primary" @click="changeNews('1')" style="fontSize:20px">知乎</el-button>
        <el-button  style="backgroundColor:#FFD440;fontSize:20px;color:white" @click="changeNews('2')" >微博</el-button>
        <el-button type="success" @click="changeNews('3')" style="fontSize:20px">微信</el-button>
        <el-button  @click="changeNews('4')" style="fontSize:20px">百度</el-button>
        <el-button type="danger" @click="changeNews('5')" style="fontSize:20px">头条</el-button>
      </div>
      <div class="d-flex align-items-center">
        <img v-if="currentImg" :src="currentImg" alt="" style="width:50px;height:50px;borderRadius:50%">
        <img v-else  alt="" style="width:50px;height:50px;borderRadius:50%" src="https://file.ipadown.com/tophub/assets/images/media/zhihu.com.png_50x50.png">
        <span class="px-2 py-2 bg-f5 mt-3 text-secondary mb-3" style="width:450px;fontSize:25px">今天都发生了什么?</span>
      </div>
      <div v-if="News && News.WeiBo">
      <div class="d-flex mb-3 w-75 mx-auto" v-for="(item,key) in currentNews" :key="item.title">
        <a id="a" class="text-dark d-flex align-items-start" target="_blank" :href="item.url">
          <p  v-if="key <= 8" :style="{'color':key< 3?'red':'#C2A469'}" class="mr-5" style="fontSize:23px">{{'0'+ (key+1)}}</p>
          <p v-else style="fontSize:23px;color:#C2A469" class="mr-5">{{key+1}}</p>
          <p style="fontSize:23px;" class="mr-3">{{item.title}} </p>
          <!-- <p style="fontSize:20px;">{{item.hot}}</p> -->
        </a>
      </div>
      </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
export default defineComponent({
  name: 'news',
  setup() {
    const News = ref()
    const currentNews = ref()
    const currentImg = ref()
    const imgs = `https://file.ipadown.com/tophub/assets/images/media/zhihu.com.png_50x50.png,
    https://file.ipadown.com/tophub/assets/images/media/s.weibo.com.png_50x50.png,
    https://file.ipadown.com/tophub/assets/images/media/mp.weixin.qq.com.png_50x50.png,
    https://file.ipadown.com/tophub/assets/images/media/baidu.com.png_50x50.png,
    https://file.ipadown.com/tophub/assets/images/media/so.toutiao.com.png_50x50.png`.split(',')
    const init = () => {
      axios.get('/application').then(data => {
        console.log(data)
        News.value = data.data.data
        currentNews.value = News.value.zhihu
      })
    }
    const changeNews = (id) => {
      if (id === '1') {
        currentNews.value = News.value.zhihu
        currentImg.value = imgs[0]
      }
      if (id === '2') {
        currentNews.value = News.value.WeiBo
        currentImg.value = imgs[1]
      }
      if (id === '3') {
        currentNews.value = News.value.weixin
        currentImg.value = imgs[2]
      }
      if (id === '4') {
        currentNews.value = News.value.baidu
        currentImg.value = imgs[3]
      }
      if (id === '5') {
        currentNews.value = News.value.toutiao
        currentImg.value = imgs[4]
      }
    }
    const goback = function() {
      this.$router.go(-1)
    }
    onMounted(() => {
      init()
    })
    return {
      News,
      currentNews,
      changeNews,
      currentImg,
      goback
    }
  }
})
</script>
<style scope>
.red {
  color: red;
}
.black {
  color: #C2A469;
}
#a {
  text-decoration: none;
}
</style>
