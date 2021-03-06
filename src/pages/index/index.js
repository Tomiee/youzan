import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

// import Foot from 'components/Foot.vue'
import Swipe from 'components/Swiper'

import mixin from 'js/mixin'

import {
  InfiniteScroll
} from 'mint-ui';
Vue.use(InfiniteScroll);



new Vue({
  el: '#app',
  data: {
    lists: null,
    pageNum:1,
    pageSize:6,
    loading:false,
    allLoaded:false,
    bannerLists:null
  },
  created() {
    this.getLists(),
    this.getBanner()
  },
  methods: {
    getLists() {
      if(this.allLoaded == true) return
      this.loading = true
      axios.get(url.hotLists, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        let currentLists = res.data.lists
        // 判断是否全部加载完毕
        if(currentLists.length < this.pageSize){
          this.allLoaded = true
        }
        if(this.lists){
          this.lists = this.lists.concat(currentLists)
        }else{
          this.lists = currentLists
        }
        this.loading = false
        this.pageNum++
      })
    },
    getBanner(){
      axios.get(url.banner).then(res => {
        this.bannerLists = res.data.lists
      })
    }
  },
  components:{
    Swipe
  },
  mixins:[mixin]
})
