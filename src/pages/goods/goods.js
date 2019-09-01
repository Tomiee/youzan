import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin'
import qs from 'qs'
import Swipe from 'components/Swiper'

let {
  id
} = qs.parse(location.search.substr(1))
let detailTab = ['商品详情', '本店成交']


new Vue({
  el: '#app',
  data: {
    id,
    details: null,
    detailTab,
    tabIndex: 0,
    deals : null,
    bannerLists : null,
    skuType : 1,
    showSku : false,
    skuNum:1,
    isAddCart:false,
    showAddMassage:false
  },
  components:{
    Swipe
  },
  created() {
    this.getDetails()
  },
  mixins: [mixin],
  methods: {
    getDetails() {
      axios.get(url.goodsDetails,{id}).then(res => {
        this.details = res.data.data
        this.bannerLists = []
        this.details.imgs.forEach(item => {
          this.bannerLists.push({
            clickUrl : '',
            img : item
          })
        })
      })
    },
    getDeals(){
      axios.get(url.goodsDeals).then(res => {
        this.deals = res.data.data.lists
      })
    },
    changeTab(index) {
      this.tabIndex = index
      if(index == 1){
        this.getDeals()
      }
    },
    chooseSku(type){
      this.skuType = type
      this.showSku = true
    },
    changSkuNum(num){
      if(num<0 && this.skuNum == 1) return
      this.skuNum += num
    },
    addCart(){
      axios.post(url.addCart,{
        id,
        number:this.skuNum
      }).then(res => {
        if(res.data.status === 200){
          this.showSku = false
          this.isAddCart = true
          this.showAddMassage = true

          setTimeout(() => {
            this.showAddMassage = false
          }, 1000);
        }
      })
    }
  },
  watch: {
    showSku(val,oldVal) {
      document.body.style.overflow = val?'hidden':'auto'
      document.querySelector('html').style.overflow = val?'hidden':'auto'
      // 防止在底部点击购买时,弹框出现在上方(页面之外,目前有bug)
      document.body.style.height = val?'100%':'auto'
      document.querySelector('html').style.height = val?'100%':'auto'
    }
  }
})
