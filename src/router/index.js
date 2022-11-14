import Vue from 'vue'
import VueRouter from 'vue-router'
import { AdminDetail, AdminHome, AdminList, AdminAdd, UserDetail, UserHome } from '../components'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'UserHome',
    component: UserHome
  },
  {
    path: '/conti/:id',
    name: 'UserDetail',
    component: UserDetail
  },
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome
  },
  {
    path: '/admin/list',
    name: 'AdminList',
    component: AdminList
  },
  {
    path: '/admin/detail/:id',
    name: 'AdminDetail',
    component: AdminDetail
  },
  {
    path: '/admin/add/:id?',
    name: 'AdminAdd',
    component: AdminAdd
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
