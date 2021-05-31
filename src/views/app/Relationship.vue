<template>
   <div class="w-50 bg-white1 mx-auto mb-2 py-2">
    <el-page-header icon="el-icon-arrow-left" content="二维码自动生成" @click='goback'></el-page-header>
  </div>
  <div class="mx-auto w-50 bg-white1 pt-2 pb-5">
    <h2 class="text-center mb-3 mt-2">中国亲戚计算器</h2>
    <div style="width:450px" class="mx-auto">
        <div class="mt-4 d-flex flex-column align-items-start">
            <div class="mb-2">
            <span style="fontSize:15px" class="mr-3">计算类型:</span>
            <el-radio v-model="type" label="default" style="width:80px">找称呼</el-radio>
            <el-radio v-model="type" label="chain">找关系</el-radio>
            </div>
            <div class="mb-2" v-if="type==='default'">
            <span style="fontSize:15px" class="mr-3">我的性别:</span>
            <el-radio v-model="sex" label= 1 style="width:80px">男</el-radio>
            <el-radio v-model="sex" label= 0>女</el-radio>
            </div>
            <div class="mb-2" v-if="type==='default'">
            <span style="fontSize:15px" class="mr-3">称呼方式:</span>
            <el-radio v-model="reverse" label= '0' style="width:80px">我称呼对方</el-radio>
            <el-radio v-model="reverse" label= '1' >对方称呼我</el-radio>
            </div>
        </div>
      <el-input type="textarea" :rows="5" resize="none" style="width:400px" class="mt-3" v-model="text" placeholder="称谓间用'的'隔开"> </el-input>
      <div>
      <span class="text-secondary">快速选择:</span>
      <div>
        <el-button-group class="mr-2">
        <el-button size="mini" @click="addText('爸爸')">父</el-button>
        <el-button size="mini" @click="addText('妈妈')">母</el-button>
        </el-button-group>
        <el-button-group class="mr-2">
        <el-button size="mini" @click="addText('老公')" v-if="status===1">夫</el-button>
        <el-button size="mini" @click="addText('老公')" v-else disabled>夫</el-button>
        <el-button size="mini" @click="addText('老婆')" v-if="status===0">妻</el-button>
        <el-button size="mini" @click="addText('老婆')" v-else disabled>妻</el-button>
        </el-button-group >
        <el-button-group class="mr-2">
        <el-button size="mini" @click="addText('儿子')">子</el-button>
        <el-button size="mini" @click="addText('女儿')">女</el-button>
        </el-button-group>
        <el-button-group class="mr-2">
        <el-button size="mini" @click="addText('哥哥')">兄</el-button>
        <el-button size="mini" @click="addText('弟弟')">弟</el-button>
        </el-button-group>
        <el-button-group class="mr-2">
        <el-button size="mini" @click="addText('姐姐')">姐</el-button>
        <el-button size="mini" @click="addText('妹妹')">妹</el-button>
        </el-button-group>
      </div>
      <div class="mt-2">
        <el-button type="primary" size="small" @click="clear">清空</el-button>
        <el-button type="primary" size="small" @click="count">计算</el-button>
      </div>
      <span class="text-secondary">计算结果:</span>
      <el-input type="textarea" :rows="5" resize="none" style="width:400px" class="mt-3" v-model="result"> </el-input>
      <!-- <el-input type="textarea" :rows="5" resize="none" style="width:400px" class="mt-3" placeholder="他应该和你不是很熟哦"> </el-input> -->
    </div>
    </div>
    <div>
    </div>

  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
const relationship = require('relationship.js')

export default defineComponent({
  setup() {
    const girls = ['爸爸', '儿子', '哥哥', '弟弟', '老公']
    const boys = ['妈妈', '女儿', '姐姐', '妹妹', '老婆']
    const type = ref('default')
    const sex = ref('1')
    const reverse = ref('0')
    const text = ref('')
    const result = ref('')
    const status = ref(0)
    watch(sex, () => {
      if (!text.value) {
        status.value = sex.value === '1' ? 0 : 1
      }
    })
    const addText = (item) => {
      if (girls.includes(item)) status.value = 0
      if (boys.includes(item)) status.value = 1
      if (text.value) {
        text.value += '的' + item
      } else {
        text.value += item
      }
    }
    const clear = () => {
      text.value = ''
    }
    const count = async () => {
      const option = {
        text: text.value,
        sex: sex.value,
        type: type.value,
        reverse: reverse.value !== '0'
      }
      console.log(option)
      // result.value = relationship(option)
      const res = await relationship(option)
      console.log(res)
      if (!res.length) {
        result.value = '他应该和你不是很熟哦,男的就叫哥哥，女的就叫姐姐吧'
      } else {
        result.value = res
      }
    }
    const goback = function() {
      this.$router.go(-1)
    }
    return {
      type,
      sex,
      reverse,
      text,
      addText,
      result,
      clear,
      count,
      status,
      goback
    }
  }
})
</script>
