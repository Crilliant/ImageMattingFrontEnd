import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import header from "@/views/Header";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
  ,{
    path: '/t',
    name:'test',
    component: header
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
