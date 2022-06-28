import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import header from "@/views/Header";
import Header from "@/test/Header";
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
  ,{
    path: '/test',
    name:'test',
    component: header
  },{
  path: '/t',
    name: 'T',
    component: Header
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
