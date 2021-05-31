<template>
    <div class="w-50 mx-auto text-center text-white d-flex flex-column justify-content-center" style="height:700px">
      <div>
          <div class="bg-img mx-auto"></div>
        <p class="mt-3" @click="getRandomMotto">{{currMotto}}</p>
      </div>
      <div class="text-center mt-4">
        <router-link to="/home">
          <el-button class="shadow mr-2" type="primary" style="width:150px"> <i class="el-icon-document-copy mr-1"></i>专栏</el-button>
        </router-link>
        <router-link to="/nav">
          <el-button class="bg-12" style="width:150px"> <i class="el-icon-s-promotion mr-1"></i>导航</el-button>
        </router-link>
      </div>
    </div>
   <div class="homepage-hero-module">
      <div class="video-container">
        <div :style="fixStyle" class="filter">
          <!--内容-->
        </div>
        <video :style="fixStyle" autoplay loop muted class="fillWidth" v-on:canplay="canplay">
          <source src="../assets/orangeflowers.mp4" type="video/mp4"/>
          <!-- <source :src="src" type="video/mp4"/> -->
          浏览器不支持 video 标签，建议升级浏览器。
          <source src="../assets/orangeflowers.mp4" type="video/webm"/>
          <!-- <source :src="src" type="video/webm"/> -->
          浏览器不支持 video 标签，建议升级浏览器。
        </video>
        <div class="poster hidden" v-if="!vedioCanPlay">
          <img :style="fixStyle" src="../assets/orangeflowers.mp4" alt="">
          <!-- <img :style="fixStyle" :src="src" alt=""> -->
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Video',
  data() {
    return {
      vedioCanPlay: false,
      fixStyle: '',
      mottos: `读一书， 增一智 * 知识永远战胜愚昧* 浪费了一生就等于夭折* 天行健， 君子以自强不息
      * 含泪播种的人一定能含笑收获* 黑发不知勤学早， 白首方悔读书迟* 人不劳动没出息， 人不学习没长进* 松驰的琴弦， 永远奏不出时代的强音
* 勤奋是聪明的土壤， 勤学是聪明的钥匙 * 少年不知勤学早， 白首方悔读书迟
      `.split('*'),
      currMotto: '学习要有三心，一信心，二决心，三恒心',
      src: '"../assets/orangeflowers.mp4"'
    }
  },
  methods: {
    canplay() {
      this.vedioCanPlay = true
    },
    getRandomMotto() {
      console.log(this.mottos.length)
      const num = Math.floor(Math.random(0, 1) * this.mottos.length)
      console.log(num)
      this.currMotto = this.mottos[num]
    }
  },
  mounted: function() { // 屏幕自适应
    window.onresize = () => {
      const windowWidth = document.body.clientWidth
      const windowHeight = document.body.clientHeight
      const windowAspectRatio = windowHeight / windowWidth
      let videoWidth
      let videoHeight
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth
        videoHeight = videoWidth * 0.5625
        this.fixStyle = {
          height: windowWidth * 0.5625 + 'px',
          width: windowWidth + 'px',
          'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
          'margin-left': 'initial'
        }
      } else {
        videoHeight = windowHeight
        videoWidth = videoHeight / 0.5625
        this.fixStyle = {
          height: windowHeight + 'px',
          width: windowHeight / 0.5625 + 'px',
          'margin-left': (windowWidth - videoWidth) / 2 + 'px',
          'margin-bottom': 'initial'
        }
      }
    }
    window.onresize()
    this.getRandomMotto()
  }
}
</script>

<style scoped>
  .homepage-hero-module,
  .video-container {
      position: fixed; right: 0; bottom: 0;
      min-width: 100%; min-height: 100%;
      width: auto; height: auto; z-index: -100;
      background-size: cover;
  }

  .video-container .poster img{
    z-index: 0;
    position: absolute;
  }

  .video-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
  }

  .fillWidth {
    width: 100%;
  }
  .bg-12 {
    background-color: #29C393;
    color:white;
  }
  .v-100{
    height: 100vh - 69px;
  }
  .bg-gray{
    background-color: #F6F6F6;
  }
  .bg-E1 {
    /* background-color: #EFF3F5; */
    background-color: #0b80bb !important;
  }
  .btn:focus, .btn:active, .btn:visited {
      outline: none !important;
      box-shadow: none !important;
  }
  .btn-outline-primary{
    border: none  !important;
  }
  .bg-green{
    background-color: #80BD01;
    color: white;
  }
  .bg-img{
    width: 800px;
    height: 110px;
    background-image: url('../assets/提高.png');
    background-position: -20px 0px;
  }
</style>
