<template>
   <div class="w-75 bg-white1 mx-auto mb-2 py-2">
    <el-page-header icon="el-icon-arrow-left" content="文字转码" @click='goback'></el-page-header>
  </div>
  <div class="w-75 mx-auto bg-white1 pb-5 pt-2">
    <h1 class="text-center">文字转码</h1>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="w-75 mx-auto">
    <el-tab-pane label="Unicode编码" name="first">
      <div class="d-flex mt-2">
        <el-input type="textarea" :rows="7" resize="none" class="mr-2" placeholder="请输入转换前的数据" v-model="unicodeIpt1"></el-input>
        <el-input type="textarea" :rows="7" resize="none" placeholder="转换后的结果" v-model="unicodeIpt2"></el-input>
      </div>
      <div class="mt-4 d-flex justify-content-end">
        <el-button type="primary" @click="ascToUni">ASCII转Unicode</el-button>
        <el-button type="primary" @click="UniToasc">Unicode转ASCII</el-button>
        <el-button type="primary" @click="UniToCN">Unicode转中文</el-button>
        <el-button type="primary" @click="CNToUni">中文转Unicode</el-button>
        <el-button @click="clear">清空输入</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="UTF-8编码" name="second">
      <div class="d-flex mt-2">
        <el-input type="textarea" :rows="7" resize="none" class="mr-2" v-model="utfIpt1" placeholder="请输入转换前的数据"></el-input>
        <el-input type="textarea" :rows="7" resize="none" v-model="utfIpt2" placeholder="转换后的结果"></el-input>
      </div>
      <div class="mt-4 d-flex justify-content-end">
        <el-button type="primary" @click="CNToUtf">中文转UTF-8</el-button>
        <el-button type="primary" @click="UtfToCN">UTF-8转中文</el-button>
        <el-button @click="clear">清空输入</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="URL编码/解码" name="third">
       <div class="d-flex mt-2">
        <el-input type="textarea" :rows="7" resize="none" class="mr-2" v-model="urlIpt1" placeholder="请输入转换前的数据"></el-input>
        <el-input type="textarea" :rows="7" resize="none" v-model="urlIpt2" placeholder="转换后的结果"></el-input>
      </div>
      <div class="mt-4 d-flex justify-content-end align-items-center">
        <el-radio v-model="selectValue" label="1">UTF-8</el-radio>
        <!-- <el-radio v-model="selectValue" label="2">gb2312</el-radio> -->
        <el-button type="primary" @click="CNToUrl">urlEncode/编码</el-button>
        <el-button type="primary" @click="UrlToCN">urlDecode/解码</el-button>
        <el-button @click="clear">清空输入</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import { defineComponent, reactive, toRef, ref } from 'vue'
export default defineComponent({
  setup() {
    const activeName = ref('first')
    const selectValue = ref('1')
    const unicodeIpt1 = ref('')
    const unicodeIpt2 = ref('')
    const utfIpt1 = ref('')
    const utfIpt2 = ref('')
    const urlIpt1 = ref('')
    const urlIpt2 = ref('')
    const handleClick = (tab, event) => {
      console.log(tab, event)
    }
    const goback = function() {
      this.$router.go(-1)
    }
    /** unicode相关 */
    const ascToUni = () => {
      unicodeIpt2.value = ''
      let res = ''
      for (let i = 0; i < unicodeIpt1.value.length; i++) { res += '&#' + unicodeIpt1.value.charCodeAt(i) + ';' }
      unicodeIpt2.value = res
    }
    const UniToasc = () => {
      unicodeIpt2.value = ''
      const code = unicodeIpt1.value.match(/&#(\d+);/g)
      let res = ''
      for (let i = 0; i < code.length; i++) { res += String.fromCharCode(code[i].replace(/[&#;]/g, '')) }
      unicodeIpt2.value = res
    }
    const UniToCN = () => {
      unicodeIpt2.value = ''
      let str = unicodeIpt1.value
      str = str.replace(/\\/g, '%')
      unicodeIpt2.value = unescape(str)
    }
    const CNToUni = () => {
      unicodeIpt2.value = ''
      const res = []
      for (let i = 0; i < unicodeIpt1.value.length; i++) {
        res[i] = ('00' + unicodeIpt1.value.charCodeAt(i).toString(16)).slice(-4)
      }
      unicodeIpt2.value = '\\u' + res.join('\\u')
    }
    const CNToUtf = () => {
      const str = utfIpt1.value
      utfIpt2.value = escape(str).replace(/(%u)(\w{4})/gi, '&#x$2;')
      console.log('12', utfIpt2.value)
    }
    const UtfToCN = () => {
      const str = utfIpt1.value
      utfIpt2.value = unescape(str.replace(/&#x/g, '%u').replace(/;/g, ''))
    }
    const UrlToCN = () => {
      if (selectValue.value === '1') {
        urlIpt2.value = decodeURI(urlIpt1.value)
      }
    }
    const CNToUrl = () => {
      if (selectValue.value === '1') {
        urlIpt2.value = encodeURI(urlIpt1.value)
      }
    }
    const clear = () => {
      unicodeIpt1.value = ''
      // unicodeIpt2.value = ''
      utfIpt1.value = ''
      // utfIpt2.value = ''
      urlIpt1.value = ''
      // urlIpt2.value = ''
    }
    return {
      handleClick,
      activeName,
      selectValue,
      unicodeIpt1,
      unicodeIpt2,
      ascToUni,
      UniToasc,
      CNToUni,
      UniToCN,
      CNToUtf,
      utfIpt1,
      utfIpt2,
      UtfToCN,
      UrlToCN,
      CNToUrl,
      urlIpt1,
      urlIpt2,
      clear,
      goback
    }
  }
})

</script>
