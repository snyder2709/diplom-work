import { createRouter, createWebHistory } from 'vue-router';
import Offer from '@/views/Offer.vue';
import GameMain from '@/views/GameMain.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active-link",
  routes: [

    {
      path: '/',
      name: 'offer',
      component: Offer,
    },
    {
      path: '/app/:id',
      name: 'app',
      component: GameMain,
    },
  ]
})

export default router
