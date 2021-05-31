<template>
   <div class="w-50 bg-white1 mx-auto mb-2 py-2">
    <el-page-header icon="el-icon-arrow-left" content="数字大写转换" @click='goback'></el-page-header>
  </div>
  <div class="w-50 mx-auto bg-white1 py-5 px-5">
    <h1 class="text-center">数字大写转换</h1>
    <p class="text-center mb-4">为您提供数字大写转换的服务，可以实现数字中文大写转换和人民币数字大写转换，结果可以复制。</p>
    <div class="text-center mt-5">
      <el-input placeholder="请输入阿拉伯数字，小数点后最多支持2位" style="width:400px" v-model="ipt" class="mr-2" @keyup.enter='NumCase'></el-input>
      <el-button type="primary" @click="NumCase">转换</el-button>
    </div>
    <div style="height:100px" class="pt-3">
    <div class=" d-flex align-items-center justify-content-center" style="fontSize:20px" v-if="res">
      <span class="mr-2" id="copy">{{res}}</span>
          <button class="btn border px-2 py-1" :data-clipboard-text="res">
            复制
           </button>
    </div>
    </div>
    <div class = ''>
       <table class="mx-auto">
                <thead>
                <tr>
                    <th v-for="item in str1" :key="item" style="width:50px;fontSize:15px;height:40px;" class="text-center bg-D2 border border-white">{{item}}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td v-for="item in str2" :key="item" style="width:50px;fontSize:20px;"  class="text-center border">{{item}}</td>
                </tr>
                </tbody>
            </table>
    </div>
    <p class="text-center mt-3 bg-D2 mx-auto px-1 py-1 mt-4">人民币大写注意事项</p>
    <div class="mx-auto">
        <ul>
          <li class="d-flex">
            <em>一、</em>
            <p>中文大写金额数字到“元”为止的，在“元”之后，应写“整”(或“正”)字，在“角”之后，可以不写“整”(或“正”)字。大写金额数字有“分”的，“分”后面不写“整”(或“正”)字。</p>
          </li>
          <li class="d-flex">
            <em>二、</em>
            <p>中文大写金额数字前应标明"人民币"字样，大写金额数字有"分"的，"分"后面不写"整"(或"正")字。</p>
          </li>
          <li class="d-flex">
            <em>三、</em>
            <p>中文大写金额数字前应标明"人民币"字样，大写金额数字应紧接"人民币"字样填写，不得留有空白。大写金额数字前未印"人民币"字样的，应加填"人民币"三字。在票据和结算凭证大写金额栏内不得预印固定的"仟、佰、拾、万、仟、佰、拾、元、角、分"字样。</p>
          </li>
          <li class="d-flex">
            <em>四、</em>
            <p>阿拉伯数字小写金额数字中有"0"时，中文大写应按照汉语语言规律、金额数字构成和防止涂改的要求进行书写。举例如下：
              1.阿拉伯数字中间有"0"时，中文大写要写"零"字，如￥1409.50，应写成人民币壹仟肆佰零玖元伍角。
              2.阿拉伯数字中间连续有几个"0"时，中文大写金额中间可以只写一个"零"字，如￥6007.14，应写成人民币陆仟零柒元壹角肆分。
              3.阿拉伯金额数字万位和元位是"0"，或者数字中间连续有几个"0"，万位、元位也是"0"，但千位、角位不是"0"时，中文大写金额中可以只写一个零字，也可以不写" 零"字。如￥1680.32，应写成人民币壹仟陆佰捌拾元零叁角贰分，或者写成人民币壹仟陆佰捌拾元叁角贰分，又如￥107000.53，应写成人民币壹拾万柒仟元零伍角叁分，或者写成人民币壹拾万零柒仟元伍角叁分。
              4.阿拉伯金额数字角位是"0"，而分位不是"0"时，中文大写金额"元"后面应写"零"字。如￥16409.02，应写成人民币壹万陆仟肆佰零玖元零贰分；又如￥325.04，应写成人民币叁佰贰拾伍元零肆分。</p>
          </li>
        </ul>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import Clipboard from 'clipboard'
export default defineComponent({
  name: 'NumCase',
  setup() {
    const str1 = '1,2,3,4,5,6,7,8,9,10,0,百,千,万,亿,元'.split(',')
    const str2 = '壹,贰,叁,肆,伍,陆,柒,捌,玖,拾,零,佰,仟,万,亿,圆'.split(',')
    const ipt = ref()
    const res = ref('')
    const convertInt = (value) => {
      const arrShuzi = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾']
      let daxieShuzi = ''
      const val = Number(value)
      const yi = Math.floor(val / 100000000)// 亿
      const wan = Math.floor(val % 100000000 / 10000)// 万
      const qian = Math.floor(val % 10000 / 1000)// 千
      const bai = Math.floor(val % 1000 / 100) // 百
      const shi = Math.floor(val % 100 / 10)// 十
      const ge = Math.floor(val % 10)// 个

      daxieShuzi += yi === 0 ? '' : arrShuzi[yi] + '亿'

      daxieShuzi += wan === 0 && yi === 0 ? '' : arrShuzi[wan]
      daxieShuzi += wan === 0 ? '' : '万'

      daxieShuzi += qian === 0 && wan === 0 ? '' : arrShuzi[qian]
      daxieShuzi += qian === 0 ? '' : '仟'

      daxieShuzi += bai === 0 && qian === 0 ? '' : arrShuzi[bai]
      daxieShuzi += bai === 0 ? '' : '佰'

      daxieShuzi += shi === 0 && bai === 0 ? '' : arrShuzi[shi]
      daxieShuzi += shi === 0 ? '' : '拾'

      daxieShuzi += ge === 0 ? '' : arrShuzi[ge]

      // 去掉最后一个零
      daxieShuzi = daxieShuzi.replace(/零$/gi, '')

      return daxieShuzi
    }
    const NumCase = () => {
      const pattern = /^[0-9]+((\.)?[0-9]+)?$/
      if (!pattern.test(ipt.value)) {
        alert('请输入数字')
        return false
      }
      if (ipt.value.length > 12) {
        alert('数据太大，请合理输入')
        return false
      }
      const dian = ipt.value.indexOf('.')
      const arrShuzi = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾']
      let daxieShuzi = ''

      const val = Number(ipt.value)
      const yi = Math.floor(val / 100000000)// 亿
      const wan = Math.floor(val % 100000000 / 10000)// 万
      const qian = Math.floor(val % 10000 / 1000)// 千
      const bai = Math.floor(val % 1000 / 100) // 百
      const shi = Math.floor(val % 100 / 10)// 十
      const ge = Math.floor(val % 10)// 个
      // 亿，万要特殊处理下
      daxieShuzi += yi === 0 ? '' : convertInt(yi) + '亿'

      if ((yi > 0 && wan < 1000) && (yi % 10 === 0)) {
        daxieShuzi += '零'
      }

      const wanConv = convertInt(wan)
      daxieShuzi += wan === 0 && yi === 0 ? '' : wanConv
      daxieShuzi += wan === 0 ? '' : '万'

      if (wan % 10 === 0 && wan > 0) {
        daxieShuzi += '零'
      }

      daxieShuzi += qian === 0 && wan === 0 ? '' : arrShuzi[qian]
      daxieShuzi += qian === 0 ? '' : '仟'

      daxieShuzi += bai === 0 && qian === 0 ? '' : arrShuzi[bai]
      daxieShuzi += bai === 0 ? '' : '佰'

      daxieShuzi += shi === 0 && bai === 0 ? '' : arrShuzi[shi]
      daxieShuzi += shi === 0 ? '' : '拾'

      daxieShuzi += ge === 0 ? '' : arrShuzi[ge]
      // 去掉最后一个零
      daxieShuzi = daxieShuzi.replace(/零$/gi, '')

      daxieShuzi += '圆'
      // 无小数点
      if (dian === -1) {
        daxieShuzi += '整'
        // 小数点
      } else {
        // 如果个位不是零，则不需加零
        if (ge === 0) {
          daxieShuzi += '零'
        }

        // 只取两位小数点
        const floatShuzhi = ipt.value.substr(dian + 1)

        const jiao = ipt.value.substr(dian + 1, 1) // 角
        daxieShuzi += jiao === 0 ? '' : arrShuzi[jiao]
        daxieShuzi += jiao === 0 ? '' : '角'

        if (floatShuzhi.length > 1) {
          daxieShuzi += jiao === 0 ? '零' : ''
          const fen = ipt.value.substr(dian + 2, 1) // 分
          daxieShuzi += fen === 0 ? '' : arrShuzi[fen] + '分'
        }
      }
      // 去掉重复零
      daxieShuzi = daxieShuzi.replace(/零{2,}/g, '零')
      // document.getElementById('output_div').style.display = 'block';
      // document.getElementById('output_shuzi').innerHTML = daxieShuzi
      res.value = daxieShuzi
      console.log(daxieShuzi)
    }
    onMounted(() => {
      const clipboard = new Clipboard('.btn')
      clipboard.on('success', e => {
        ElMessage.success({
          message: '恭喜你，复制成功',
          type: 'success'
        })
      })
      clipboard.on('error', e => {
        ElMessage.error('复制失败')
      })
    })
    const goback = function() {
      this.$router.go(-1)
    }
    return {
      str1,
      str2,
      ipt,
      NumCase,
      res,
      goback
    }
  }
})

</script>

<style scoped>
  .bg-D2 {
    background-color: #D2EBFF;
  }
  ul {
    list-style: none;
  }
</style>
