import 'css/common.css'
import './search.css'


import Vue from 'vue'
import Axios from 'axios'
import qs from 'qs'
import url from 'js/api.js'

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
      console.log(22)
      console.log('body'+document.body.scrollTop)
      // console.log('html'+document.html.scrollTop)
      console.log(container[0].scrollTop)
      console.log(333)
      if(document.body.scrollTop > 10){
        this.isShow = true
        console.log(111)
      }else {
        this.isShow = false
      }
    }
  }
})
