import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import introduction from "@/views/Introduction";
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '猫之使徒在线抠图'
    }
  }
  ,{
    path: '/intro',
    name:'intro',
    component: introduction,
    meta:{
      title:'关于我们',
    }
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
