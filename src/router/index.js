import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/bourse'
    },
    {
      path: '/bourse',
      name: 'bourse',
      component: HomePage
    },
    {
      path: '/submit-data',
      name: 'submit-data',
      component: () => import('@/views/CarbonAccount/SubmitData.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('@/views/CarbonAccount/History.vue')
    },
    {
      path: '/infomation',
      name: 'infomation',
      component: () => import('@/views/Infomation.vue')
    },

  ]
})

export default router
