import { createRouter, createWebHistory } from 'vue-router';
import Offer from '@/views/Offer.vue';
import GameMain from '@/views/GameMain.vue';
import Profile from '@/views/Profile.vue';
import NotFound from '@/views/NotFound.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active-link",
  routes: [
    {
      path: '/',
      name: 'offer',
      component: Offer
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/app/:id',
      name: 'app',
      component: GameMain
    },
    { path: '/app:afterUser(.*)', 
    component: NotFound
  },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})
export default router
