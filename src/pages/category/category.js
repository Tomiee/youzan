import './category.css'
import 'css/common.css'


import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import mixin from 'js/mixin'

new Vue({
  el: '#app',
  data: {
    topLists: null,
    topIndex: 0,
    subData: null,
    rankData:null
  },
  mixins:[mixin],
  created() {
    this.getTopLists()
    this.getSubLists(0)
    this.getRank()
  },
  methods: {
    getTopLists() {
      axios.get(url.category).then(res => {
        this.topLists = res.data.lists
      })
    },
    getSubLists(index, id) {
      this.topIndex = index
      if (index == 0) {
        this.getRank()
      }
        axios.get(url.subList,{id}).then(res => {
          this.subData = res.data.data
        })

    },
    getRank(){
      axios.get(url.rank).then(res => {
        this.rankData = res.data.data
      })
    },
    toSearch(list){
      location.href = `search.html?keyword=${list.name}&id=${list.id}`
    }
  }
})
