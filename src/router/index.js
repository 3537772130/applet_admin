import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Main from '@/views/admin/main-info'
import PageDefault from  '@/views/admin/applet/file/page/default/page-default'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/main-info',
      name: 'main-info',
      component: Main
    },
    {
      path: '/page-default',
      name: 'page-default',
      component: PageDefault
    }
  ]
})
