<template>
   <div class="w-50 bg-white1 mx-auto mb-2 py-2">
    <el-page-header icon="el-icon-arrow-left" content="身份归属地查询" @click='goback'></el-page-header>
  </div>
  <div class="mx-auto w-50 bg-white1 px-5 py-3">
    <h1 class="text-center">身份归属地查询</h1>
    <div class="text-center mt-5" style="height:300px">
      <div>
        <el-input placeholder="身份归属地查询" style="width:400px" class="mr-2" v-model="ipt" @keyup.enter="parseId"></el-input>
        <el-button type="primary" @click="parseId">点击查询</el-button>
      </div>
      <div class="d-flex flex-column mt-5 align-items-baseline mx-auto" style="width:300px;fontSize:20px">
        <span v-if="sex">性别：{{sex}}</span>
        <span v-if="sex">生日：{{birh}}</span>
        <span v-if="sex">地址：{{addr}}</span>
        <span v-if="sex">星座：{{cons}}</span>
      </div>
    </div>
    <div>
      证件号码查询说明
      <ul>
        <li>根据证件号码快速准确地查询所属地区、解析出生年月日和性别，校验15/18位证件号码的有效性。</li>
        <li>证件号码编排规则(18位身份证号码)</li>
        <li>身份证号码是特征组合码，由17位数字本体码和1位校验码组成。前1、2位数字表示：所在省份的代码；第3、4位数字表示：所在城市的代码；第5、 6位数字表示：所在区县的代码；第7~14位数字表示：出生年、月、日；第15、16位数字表示：所在地的派出所的代码；第17位数字表示性别：奇数表示男性，偶数表示女性；第18位数字是校检码：用来检验证件号码的正确性，校检码由0~9的数字、及X表示。</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
export default defineComponent({
  name: 'identAttr',
  setup() {
    const ipt = ref('')
    const sex = ref('')
    const addr = ref('')
    const birh = ref('')
    const cons = ref('')
    const parseId = async() => {
      const { data } = await axios.get(`/application/ident?id=${ipt.value}`)
      if (data.code === 1) {
        ElMessage.error(data.data)
      } else {
        ElMessage.success({
          message: '恭喜你，查询成功',
          type: 'success'
        })
        console.log(data.data)
        sex.value = data.data.gender.cn
        addr.value = data.data.area.name
        cons.value = data.data.birthday.constellation_cn
        birh.value = data.data.birthday.date
        birh.value = birh.value.slice(0, 4) + '年' + birh.value.slice(4, 6) + '月' + birh.value.slice(6, 8) + '日'
      }
      // res.value = data
    }
    const goback = function() {
      this.$router.go(-1)
    }
    return {
      ipt,
      parseId,
      sex,
      addr,
      birh,
      cons,
      goback
    }
  }
})

</script>
