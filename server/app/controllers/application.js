const superagent = require('superagent')
const querystring = require('querystring')
const cheerio = require('cheerio')
const fs = require('fs')
var eventproxy = require('eventproxy')
var ep = new eventproxy()
var homeInfoList=[]
let urlList=[]
let count = 1

// urlList.push('https://yibin.lianjia.com/zufang/#contentList')
urlList.push('https://tophub.today/c/news')
// for(let i = 2;i<=count;i++){
//     let url = `https://yibin.lianjia.com/zufang/pg${i}/#contentList`
//     urlList.push(url)
// }
function main(){
    getInfoByUrl()
    ep.after('getInfo',count,function(info){
        homeInfoList = info[0]
    })
    return homeInfoList
}
main()

function getInfoByUrl(){
    for(let i=0;i<count;i++){
         superagent
         .get(urlList[i])
         .end((err,res)=>{
            if(err){
                console.log('抓取失败')
            }else{
              // console.log(res.text)
                let v =   getHomeInfo(res.text)
                ep.emit('getInfo',v);
            } 
        })
    }
      
}
function getHomeInfo(pageHtml){
    let zhiHuInfo = []
    let WeiBoInfo = []
    let WeiXinInfo = []
    let History = []
    let BaiDuInfo = []
    let TouTiaoInfo = []
    let $ = cheerio.load(pageHtml, { decodeEntities: false })
    // console.log($('#node-6 .nano-content a').html())
    $('#node-6 .nano-content a').each((idx,ele) => {
      let info = {
        title:$(ele).find('.t').text().trim(),
        hot:$(ele).find('.e').text().trim(),
        url:$(ele).attr('href')
      }
      zhiHuInfo.push(info)
    })
    $('#node-3608 .nano-content a').each((idx,ele) => {
      let info = {
        title:$(ele).find('.t').text().trim(),
        hot:$(ele).find('.e').text().trim(),
        url:$(ele).attr('href')
      }
      TouTiaoInfo.push(info)
    })
    $('#node-1 .nano-content a').each((idx,ele) => {
      let info = {
        title:$(ele).find('.t').text().trim(),
        hot:$(ele).find('.e').text().trim(),
        url:$(ele).attr('href')
      }
      WeiBoInfo.push(info)
    })
    $('#node-2 .nano-content a').each((idx,ele) => {
      let info = {
        title:$(ele).find('.t').text().trim(),
        hot:$(ele).find('.e').text().trim(),
        url:$(ele).attr('href')
      }
      BaiDuInfo.push(info)
    })
    $('#node-5 .nano-content a').each((idx,ele) => {
      let info = {
        title:$(ele).find('.t').text().trim(),
        hot:$(ele).find('.e').text().trim(),
        url:$(ele).attr('href')
      }
      WeiXinInfo.push(info)
    })
    $('#node-369 .nano-content a').each((idx,ele) => {
      let info = {
        title:$(ele).find('.t').text().trim(),
        url:$(ele).attr('href')
      }
      History.push(info)
    })
    const res = {
      zhihu:zhiHuInfo,
      WeiBo:WeiBoInfo,
      weixin:WeiXinInfo,
      history:History,
      baidu:BaiDuInfo,
      toutiao:TouTiaoInfo
    }
    // console.log(res)
    return res
}

exports.getAppInfo = async(ctx,next) => {
   const res = main()
   ctx.body = {
     code:0,
     data:res
   }
} 