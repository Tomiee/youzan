import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import mixin from 'js/mixin.js'
import url from 'js/api.js'
import axios from 'axios'

new Vue({
  el:'.container',
  data:{
    lists:null
  },
  computed:{

  },
  created(){
    this.getLists()
  },
  methods:{
    getLists(){
      axios.get(url.cartLists).then(res =>{
        let lists = res.data.cartList
        lists.forEach(shop => {
          shop.checked = true
          shop.goodsList.forEach(good => {
            good.checked = true
          })
        })
        this.lists = lists
      })
    },
    selectGood(good){
      good.checked = !good.checked
    }
  },
  mixins:[mixin]

})
