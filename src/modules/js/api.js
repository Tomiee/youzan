let url = {
  hotLists:'index/hotLists',
  banner:'index/banner',
  category:'category/topList',
  rank:'category/rank',
  subList:'category/subList',
  searchList:'search/list',
  goodsDetails:'goods/details',
  goodsDeals:'goods/deal',
  addCart:'cart/add',
  cartLists:'cart/list',
  cartReduce:'cart/reduce',
  cartRemove:'cart/remove',
  cartMremove:'cart/mrremove',
  addressLists:'address/list',
  addressAdd:'address/add',
  addressRemove:'address/remove',
  addressUpdate:'address/update',
  addressSetDefault:'address/setDefault',
}

// 开发环境和真实环境的切换

let host = 'http://rap2api.taobao.org/app/mock/7058/'

for(let key in url){
  if(url.hasOwnProperty(key)){
    url[key] = host + url[key]
  }
}

export default url
