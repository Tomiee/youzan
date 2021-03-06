import './components/member_base.css'
import './components/member.css'

import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)

let routes = [{
    path: '/',
    components: require('./components/member.vue')
  },
  {
    path: '/address',
    components: require('./components/address.vue'),
    children: [
      {
        path:'',
        // components: require('./components/all.vue')
        redirect:'all'
      },
      {
        path: 'all',
        name:'all',
        components: require('./components/all.vue')
      },
      {
        path: 'form',
        name:'form',
        components: require('./components/form.vue')
      }
    ]
  }
]

// 创建router实例
let router = new Router({
  routes
})

// 根组件的注入
new Vue({
  el: '#app',
  router
})
