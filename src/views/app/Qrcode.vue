<template>
   <div class="w-50 bg-white1 mx-auto mb-2 py-2">
    <el-page-header icon="el-icon-arrow-left" content="二维码自动生成" @click='goback'></el-page-header>
  </div>
  <div class="w-50 bg-white1 mx-auto d-flex flex-column text-center py-3" style="height:500px">
    <h1>二维码自动生成</h1>
    <div class="d-flex justify-content-center mt-3">
    <div class="d-flex flex-column ">
      <div class="d-flex justify-content-between align-items-end mb-2" style="width:400px">
      <span style="fontSize:25px" class="text-secondary">输入文字</span>
      <span class="text-secondary" style="fontSize:10px">即时输入即时生成!</span>
      </div>
      <el-input
        type="textarea"
        placeholder='支持文本，网址，电子邮件'
        :autosize="{ minRows: 5, maxRows: 5 }"
        resize="none"
        class="mr-4"
        v-model="text"
        style="width: 400px"
        @input="init"
      ></el-input>
    </div>
    <div>
     <div id="qrcode" class="mt-5"></div>
     <el-button @click="download" class="mt-3" size="medium" type="primary">保存图片</el-button>
    </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
const QRCode = require('../../tools/qrcode.js')
export default defineComponent({
  setup() {
    const text = ref('')
    const init = () => {
      document.getElementById('qrcode').innerHTML = ''
      const qrcode = new QRCode('qrcode', {
        width: 100,
        height: 100,
        colorDark: '#123'
      })
      const makeCode = function () {
        // if (!text) {
        //   qrcode.makeCode('欢迎使用二维码生成工具')
        // } else {
        console.log('text', text.value)
        qrcode.makeCode(text.value)
        // }
      }
      makeCode()
    }
    const download = () => {
      const img = document.getElementById('qrcode').lastChild
      console.log(img)
      const url = img.src
      const a = document.createElement('a')
      const event = new MouseEvent('click')
      a.download = '二维码'
      a.href = url
      a.dispatchEvent(event)
    }
    onMounted(() => {
      init()
    })
    const goback = function() {
      this.$router.go(-1)
    }
    return {
      init,
      text,
      download,
      goback
    }
  }
})
</script>
