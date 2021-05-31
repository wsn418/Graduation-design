<template>
  <div class="w-75 mx-auto shadow">
    <div class="bg-white1 rounded text-center py-5">
      <div class="d-flex align-items-center justify-content-center">
        <img src="//www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png" alt="" style="height:80px" class="mb-4 mr-3">
        <!-- <span class="mr-3" style="fontSize:30px">百度搜索</span> -->
        <el-input style="width:400px" class="mr-2" v-model="ipt" @input="changeParams"></el-input>
        <a :href="currUrl" target="_black">
          <el-button class="bg-primary text-white" >搜索</el-button>
        </a>
      </div>
    </div>
    <div class="bg-white1 rounded mt-5 py-2 px-2 shadow">
        <div>
          <span class="p-1 bg-primary mr-3" style="heigth:20px"> </span><span>快捷应用</span>
        </div>
        <div>
          <ul class="list-inline app mt-2 ">
            <li class="list-inline-item">
               <router-link to="/News">
               <div class="d-flex flex-column px-2 text-center">
                 <img src="../assets/img/xinwen.png" alt="">
                 <span class="mt-2">今日要闻</span>
              </div>
              </router-link>
            </li>
             <li class="list-inline-item">
               <router-link to="/Calendar">
               <div class="d-flex flex-column px-2 text-center">
                 <img src="../assets/img/lishi.png" alt="">
                 <span class="mt-2">历史上的今天</span>
              </div>
              </router-link>
            </li>
            <li class="list-inline-item">
                <router-link to="/qrcode">
               <div class="d-flex flex-column px-2 text-center">
                 <img src="../assets/img/qrcode.png" alt="">
                 <span class="mt-2">二维码生成</span>
              </div>
               </router-link>
            </li>
            <li class="list-inline-item">
               <router-link to="/GarbageClass">
               <div class="d-flex flex-column px-2 text-center">
                 <img src="../assets/img/laji.png" alt="">
                 <span class="mt-2">垃圾分类</span>
              </div>
              </router-link>
            </li>
            <li class="list-inline-item" @click="change" style="cursor: pointer;">
               <div class="d-flex flex-column px-2 text-center">
                 <img src="../assets/img/xiangxia.png" alt="">
                 <span class="mt-2" style="text-decoration: underline;">更多</span>
              </div>
            </li>
          </ul>
           <transition name="el-fade-in">
            <ul class="list-inline app mt-2 border-top pt-3 px-2" v-if="more">
              <!-- <li class="list-inline-item">
              <router-link to="/Weather">
                <div class="d-flex flex-column px-2 text-center">
                  <img src="../assets/img/tianqi.png" alt="">
                  <span class="mt-2">天气查询</span>
                </div>
                </router-link>
              </li> -->
              <li class="list-inline-item">
                <router-link to="/IdentAttr">
                <div class="d-flex flex-column px-2 text-center">
                  <img src="../assets/img/shenfenzheng.png" alt="">
                  <span class="mt-2">身份归属地</span>
                </div>
                 </router-link>
              </li>
              <li class="list-inline-item">
                <router-link to="/Relationship">
                <div class="d-flex flex-column px-2 text-center">
                  <img src="../assets/img/kinship-full.png" alt="">
                  <span class="mt-2">亲属关系计算器</span>
                </div>
                </router-link>
              </li>
              <li class="list-inline-item">
                <router-link to="/NumCase">
                <div class="d-flex flex-column px-2 text-center">
                  <img src="../assets/img/shuzi.png" alt="">
                  <span class="mt-2">数字大写转换</span>
                </div>
                </router-link>
              </li>
              <li class="list-inline-item">
                <router-link to="/Ip">
                <div class="d-flex flex-column px-2 text-center">
                  <img src="../assets/img/ip.png" alt="">
                  <span class="mt-2">ip查询</span>
                </div>
                </router-link>
              </li>
              <li class="list-inline-item">
                <router-link to="/Encode">
                <div class="d-flex flex-column px-2 text-center">
                  <img src="../assets/img/zhuanma.png" alt="">
                  <span class="mt-2">文字转码</span>
                </div>
                </router-link>
              </li>
            </ul>
           </transition>
        </div>
    </div>
    <div class="bg-white1 rounded mt-5 py-2 shadow">
      <div>
        <span class="p-1 bg-primary mr-3" style="heigth:20px"> </span><span>快捷导航</span>
        <div class="pt-3">
          <ul class="list-inline">
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://www.wafcloud.net/" target="_blank">
                      <img src="https://www.wafcloud.net/favicon.ico">
                      <span>乌云盾-CDN</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://space.bilibili.com/701446427/" target="_blank">
                      <img src="https://space.bilibili.com/favicon.ico">
                      <span>哔哩哔哩</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://www.aliyun.com/minisite/goods?userCode=0phtycgr" target="_blank">
                      <img src="https://www.aliyun.com/favicon.ico">
                      <span>服务器购买</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://www.zhihu.com/people/xuexiangban" target="_blank">
                      <img src="https://www.zhihu.com/favicon.ico">
                      <span>知乎</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://www.toutiao.com/c/user/token/MS4wLjABAAAArhqBubaMnH3Y_0bG4V7xz1Te4GRLlGzhSBcrLSoUPShKIZi5TW2sPfrH1g3vD4L4/" target="_blank">
                      <img src="https://www.toutiao.com/favicon.ico">
                      <span>今日头条</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://xuexiangban.ke.qq.com" target="_blank">
                      <img src="https://xuexiangban.ke.qq.com/favicon.ico">
                      <span>腾讯课堂</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://gitee.com/xuexiangban" target="_blank">
                      <img src="https://gitee.com/favicon.ico">
                      <span>码云</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://shop280755045.taobao.com" target="_blank">
                      <img src="https://www.taobao.com/favicon.ico">
                      <span>淘宝</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://www.qq.com/" target="_blank">
                      <img src="https://www.qq.com/favicon.ico">
                      <span>腾讯新闻</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://www.cctv.com/" target="_blank">
                      <img src="https://www.cctv.com/favicon.ico">
                      <span>央视网</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://y.qq.com/" target="_blank">
                      <img src="https://y.qq.com/favicon.ico">
                      <span>QQ音乐</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://music.163.com/" target="_blank">
                      <img src="https://s1.music.126.net/style/favicon.ico?v20180823">
                      <span>网易云音乐</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://fanyi.baidu.com/" target="_blank">
                      <img src="https://fanyi.baidu.com/favicon.ico">
                      <span>百度翻译</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://lanhuapp.com/" target="_blank">
                      <img src="data:image/x-icon;base64,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+f/4uqb/8XNL//FySf/xckn/8XJJ//FySf/xckn5/4CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPFySc/xckn/8XJJ//FySf/xckn/+sq7///////////////////////////////////////6yrv/8XJJ//FySf/xckn/8XJJ//FySeUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8XJJxfFySf/xckn/8XJJ//adgf///////////////////////////+jm5v/U0dH/9/b2///////1nYD/8XJJ//FySf/xckn/8XJJ2QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADxckm98XJJ//FySf/xckn/+9jM//////////////////////+Rioj/QTUy/0E1Mv9SR0T/0s/P//vXy//xckn/8XJJ//FySf/xcknTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPFySbfxckn/8XJJ//FySf/+9fL/////////////////xcHA/0E1Mv9BNTL/QTUy/0E1Mv9YTkv//vTx//FySf/xckn/8XJJ//FySc8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8XJJpfFySf/xckn/8XJJ//749v////////////////+clpT/QTUy/0E1Mv9BNTL/QTUy/0E1Mv/t5OH/8XJJ//FySf/xckn/8XJJuwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADxckmJ8XJJ//FySf/xckn//OPb/////////////////7q2tf9BNTL/QTUy/0E1Mv9BNTL/T0RB//vg1//xckn/8XJJ//FySf/xckmhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPJzSkzxckn/8XJJ//FySf/3s5z//////////////////Pz8/3dubP9BNTL/QTUy/0Y7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">
                      <span>蓝湖</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://www.processon.com/" target="_blank">
                      <img src="https://www.processon.com/favicon.ico">
                      <span>processon</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://pay.weixin.qq.com/" target="_blank">
                      <img src="https://wx.gtimg.com/core/favicon.ico">
                      <span>微信支付</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://open.weixin.qq.com/" target="_blank">
                      <img src="https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico">
                      <span>微信开放平台</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://www.alipay.com/" target="_blank">
                      <img src="https://img.alicdn.com/tfs/TB1qEwuzrj1gK0jSZFOXXc7GpXa-32-32.ico">
                      <span>支付宝</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://www.aliyun.com/" target="_blank">
                      <img src="https://www.aliyun.com/favicon.ico">
                      <span>阿里云</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://www.zcool.com.cn/discover" target="_blank">
                      <img src="https://static.zcool.cn/git_z/z/site/favicon.ico?version=1606222881216">
                      <span>站酷网</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://huaban.com/discovery/" target="_blank">
                      <img src="https://huaban.com/img/touch-icon-iphone-retina.png">
                      <span>花瓣网</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://www.nowcoder.com/contestRoom" target="_blank">
                      <img src="https://www.nowcoder.com/favicon.ico">
                      <span>牛客网</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://leetcode-cn.com/problemset/all/" target="_blank">
                      <img src="https://leetcode-cn.com/favicon.ico">
                      <span>LeetCode</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="http://piaofang.maoyan.com/dashboard" target="_blank">
                      <img src="http://s0.meituan.net/bs/?f=myfe/piaofang:img/favicon-f8defb48.ico">
                      <span>电影实时票房</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://www.ui.cn/" target="_blank">
                      <img src="https://www.ui.cn/favicon.ico">
                      <span>UI中国</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://ziyuan.baidu.com/" target="_blank">
                      <img src="https://ziyuan.baidu.com/favicon.ico">
                      <span>百度资源</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://favor.fund.eastmoney.com/" target="_blank">
                      <img src="https://favor.fund.eastmoney.com/favicon.ico">
                      <span>天天基金网</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="http://iconfont.cn/" target="_blank">
                      <img src="https://img.alicdn.com/tps/i4/TB1_oz6GVXXXXaFXpXXJDFnIXXX-64-64.ico">
                      <span>iconfont</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://www.bootcdn.cn/" target="_blank">
                      <img src="https://www.bootcdn.cn/assets/ico/favicon.ico?1608299009206">
                      <span>BootCDN</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://mp.weixin.qq.com/" target="_blank">
                      <img src="https://wx.gtimg.com/core/favicon.ico">
                      <span>微信公众平台</span>
                  </a>
              </li>
              <li class="list-inline-item">
                  <a class="ksd-link-a" href="https://connect.qq.com/index.html" target="_blank">
                      <img src="https://connect.qq.com/favicon.ico">
                      <span>QQ互联</span>
                  </a>
              </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'nav',
  setup () {
    const more = ref(false)
    const currUrl = ref('')
    const change = () => {
      more.value = !more.value
    }
    const ipt = ref('')
    const changeParams = () => {
      currUrl.value = 'https://www.baidu.com/s?wd=' + ipt.value
    }
    return {
      more,
      change,
      ipt,
      currUrl,
      changeParams
    }
  }
})
</script>
<style>
.ksd-link-a>img{
  width: 16px;
  margin-right: 10px;
}
.ksd-link-a {
  display: inline-block;
  width: 150px;
  text-decoration: none;
  color: #34495e;
  font-size: 15px;
  outline: none;
}
.app img{
  width: 100px;
}
a {
  color:black !important;
  text-decoration: none !important;
}
li img {
  width: 100px;
}
.el-fade-in-leave-active {
  transition: opacity .1s !important;
}
.el-fade-in-enter-active {
  transition: opacity 1s !important;
}
.bg-white1{
  background-color: rgba(255, 255, 255, 0.6) !important;
}
</style>
