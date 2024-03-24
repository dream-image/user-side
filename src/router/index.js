import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/firm/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/bourse',
      name: 'bourse',
      component: HomePage
    },
    {
      path: '/submit-data',
      name: 'submit-data',
      component: () => import('@/views/firm/CarbonAccount/SubmitData.vue')
    },
    {
      path: '/firm-history',
      name: 'firm-history',
      component: () => import('@/views/firm/CarbonAccount/History.vue')
    },
    {
      path: '/information',
      name: 'information',
      component: () => import('@/views/firm/Information.vue')
    },
    {
      path: '/audit',
      name: 'audit',
      component: () => import('@/views/auditor/Audit.vue')
    },
    {
      path: '/auditor-history',
      name: "auditor-history",
      component: () => import('@/views/auditor/History.vue')
    },
  ]
})

export default router
