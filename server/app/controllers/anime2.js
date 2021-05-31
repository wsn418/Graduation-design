
const request = require('superagent');
const charset = require('superagent-charset');
const urlencode = require('urlencode')
var iconv = require('iconv-lite')
charset(request);
const cheerio = require('cheerio')
var eventproxy = require('eventproxy')
var ep = new eventproxy()
var homeInfoList=[]
let urlList=[]
let count = 1

function main( urls ){
    getInfoByUrl( urls )
    ep.after('getInfo',count,function(info){ 
        homeInfoList = info[0]
    })
    return homeInfoList
}
function getInfoByUrl( urls ){
    for(let i=0;i<count;i++){
      request
         .get(urlList[i])
         .end((err,res)=>{
            if(err){
                console.log('抓取失败')
            }else{
                let v =   getHomeInfo(res.text)
                // console.log(res.text)
                ep.emit('getInfo',v);
            } 
        })
    }
      
}
function getHomeInfo(pageHtml){
    let $ = cheerio.load(pageHtml, { decodeEntities: false })
    const res = []
    $('#search_list>.list-unstyled>li').each((idx,ele) => {
      const animeInfo = {
        img: 'https://agefans.org'+$(ele).find('.float-left a img').attr('src'),
        url: 'https://agefans.org'+ $(ele).find('.float-left a').attr('href'),
        title:$(ele).find('.card-body h5').text(),
        oName:'别名 :'+$(ele).find('.card-body').children('div').eq(1).children('span').eq(1).text().trim(),
        type:$(ele).find('.card-body ul').children('li').eq(5).children('span').eq(1).text(),
        desc:$(ele).find('.card-body .ellipsis_summary').children('span').eq(1).text().trim(),
        source:'AGE动漫'
      }
      res.push(animeInfo)
    })
    return res
}
exports.getAnimeInfo = (nm) => {
  const name = nm
  // console.log(name,'name')
  const gbName = urlencode(name)
  urlList.push(`https://agefans.org/search?q=${gbName}`)
  // console.log(urlList)
  const res = main( urlList )
  return res
} 