import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import header from "@/views/Header";
import test from "@/views/test";
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
  ,{
    path: '/zxy',
    name:'test',
    component: test
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
