import Vue from 'vue'
import VueRouter from 'vue-router'
import { AdminCreate, AdminHome, AdminList } from '../components'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome
  },
  {
    path: '/admin/create',
    name: 'AdminCreate',
    component: AdminCreate
  },
  {
    path: '/admin/list',
    name: 'AdminList',
    component: AdminList
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
