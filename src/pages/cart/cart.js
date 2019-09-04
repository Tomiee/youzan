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
    lists:null,
    total:0,
    totalNumber:0,
    editingShop:null,
    editingIndex:-1,
    removePopup:false,
    removeData:null
  },
  computed:{
    allSelected:{
      get(){
        if(this.lists&&this.lists.length){
          return this.lists.every(shop => {
            return shop.checked
          })
        }
        return false
      },
      set(newVal){
        this.lists.forEach(shop => {
          shop.checked = newVal
          shop.goodsList.forEach(good => {
              good.checked = newVal
            }
          )
        })
      }
    },
    allRemoveSelected:{
      get(){
        if(this.editingShop){
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newVal){
        if(this.editingShop){
          this.editingShop.removeChecked = newVal
          this.editingShop.goodsList.forEach(good => {
            good.removeChecked = newVal
          })
        }
      }
    },
    selectList(){
      let arr = []
      if(this.lists&&this.lists.length){
        let total = 0
        let totalNumber = 0
        this.lists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if(good.checked){
              arr.push(good)
              total += good.price*good.number
              totalNumber += good.number
            }
          })
        })
        this.total = total
        this.totalNumber = totalNumber
      }
      return arr
    },
    removeList(){
      let arr = []
      if(this.editingShop){
        this.editingShop.goodsList.forEach(good => {
          if(good.removeChecked){
            arr.push(good)
          }
        })
      }
      return arr
    }
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
          shop.removeChecked = false
          shop.editing = false
          shop.editingMsg = "编辑"
          shop.goodsList.forEach(good => {
            good.checked = true
            good.removeChecked = false
          })
        })
        this.lists = lists
      })
    },
    selectGood(shop,good){
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      good[attr] = !good[attr]
      shop[attr] = shop.goodsList.every(good => {
        return good[attr]
      })
    },
    selectShop(shop){
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      shop[attr] = !shop[attr]
      shop.goodsList.forEach(good => {
        good[attr] = shop[attr]
      });
    },
    selectAll(){
      let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
      this[attr] = !this[attr]
    },
    edit(shop,shopIndex){
      shop.editing = !shop.editing
      shop.editingMsg = shop.editing?"完成":"编辑"
      this.lists.forEach((item,i)　=> {
        if(shopIndex != i){
          item.editing = false
          item.editingMsg = shop.editing?"":"编辑"
        }
      })
      this.editingShop = shop.editing ? shop : null
      this.editingIndex = shop.editing? shopIndex : -1
    },
    reduce(good){
      if(good.number == 1){
        return
      }
      axios.post(url.cartReduce,{
        id: good.id,
        number: 1
      }).then(res => {
        good.number --
      })
    },
    add(good){
      axios.post(url.addCart,{
        id: good.id,
        number: 1
      }).then(res => {
        good.number ++
      })
    },
    remove(shop,shopIndex,good,goodIndex){
      this.removePopup = true
      this.removeData = {shop,shopIndex,good,goodIndex}
    },
    removeConfirm(){
      let {shop,shopIndex,good,goodIndex} = this.removeData
      axios.post(url.cartRemove,{
        id:good.id
      }).then(res => {
        shop.goodsList.splice(goodIndex,1)
        if(!shop.goodsList.length){
          this.lists.splice(shopIndex,1)
          this.removeShop()
        }
        this.removePopup = false
      })
    },
    removeShop(){
      this.editingShop = null
      this.editingIndex = -1
      this.lists.forEach(shop => {
        shop.editing = false
        shop.editingMsg = "编辑"
      });
    }
  },
  mixins:[mixin]

})
