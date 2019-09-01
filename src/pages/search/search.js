import 'css/common.css'
import './search.css'


import Vue from 'vue'
import Axios from 'axios'
import qs from 'qs'
import url from 'js/api.js'
import Velocity from 'velocity-animate'

import mixin from  'js/mixin'


let {keyword,id} = qs.parse(location.search.substr(1))
let container = document.getElementsByClassName('container')

new Vue({
  el:'.container',
  data:{
    searchList:null,
    keyword,
    isShow:false
  },
  mixins:[mixin],
  created(){
    this.getSearchList()
  },
  methods:{
    getSearchList(){
      Axios.get(url.searchList,{keyword,id}).then(res => {
        this.searchList = res.data.lists
      })
    },
    move(){
      if(window.scrollY > 300){
        this.isShow = true
      }else {
        this.isShow = false
      }
    },
    toTop(){
      Velocity(document.body,'scroll',{duration:'300'})
    }
  }
})
