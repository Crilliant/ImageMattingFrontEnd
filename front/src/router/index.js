import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import introduction from "@/views/Introduction";
import manual from "@/views/Manual";
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
    },
  {
    path: '/manual',
    name: 'manual',
    component: manual
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
