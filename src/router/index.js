import Vue from 'vue'
import VueRouter from 'vue-router'
import { AdminDetail, AdminHome, AdminList, UserDetail, UserHome } from '../components'

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
    path: '/admin/:id',
    name: 'AdminDetail',
    component: AdminDetail
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
