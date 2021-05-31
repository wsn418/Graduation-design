
const request = require('superagent');
const charset = require('superagent-charset');
charset(request);
const Anime2 = require('./anime2')
const urlencode = require('urlencode')
const cheerio = require('cheerio')
var eventproxy = require('eventproxy')
var ep = new eventproxy()
var homeInfoList=[]
let urlList=[]
let count = 1

function main(){
    getInfoByUrl( )
    ep.after('getInfo',count,function(info){ 
        homeInfoList = info[0]
    })
    return homeInfoList
}
function getInfoByUrl(){
    for(let i=0;i<count;i++){
      request
         .get(urlList[i])
         .charset('gb2312')
         .end((err,res)=>{
            if(err){
                console.log('抓取失败')
            }else{
                let v = getHomeInfo(res.text)
                // console.log(res.text)
                ep.emit('getInfo',v);
            } 
        })
    }
      
}
function getHomeInfo(pageHtml){
    let $ = cheerio.load(pageHtml, { decodeEntities: false })
    const res = []
    $('.fire .pics li').each((idx,ele) => {
      const specInfo = []
      $(ele).find('span').each((idx,ele) => {
        specInfo.push($(ele).text())
      })
      const animeInfo = {
        img: $(ele).find('a img').attr('src'),
        url: 'http://www.imomoe.la'+ $(ele).find('a').attr('href'),
        title:$(ele).find('h2').text(),
        oName:specInfo[0],
        type:specInfo[1],
        desc:$(ele).find('p').text(),
        source:'樱花动漫'
      }
      res.push(animeInfo)
    })
    // const page = $('.pages span').text().match(/\/(\d+)页/)[1]
    return res
    
}
exports.getAnimeInfo = async(ctx,next) => {
  const name = ctx.request.query.name
  console.log(name,'name')
  const gbName = urlencode(name,'gbk')
  urlList.push(`http://www.imomoe.la/search.asp?searchword=${gbName}`)
  const res = main()
  const res2 = Anime2.getAnimeInfo(name)
  ctx.body = {
    code:0,
    data:res,
    data2:res2
  }
} 