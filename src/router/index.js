import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // Using hash history so it works easily on GitHub Pages without extra server config
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/level/:levelId',
      name: 'level',
      component: () => import('../views/LevelView.vue')
    },
    {
      path: '/topic/animals',
      name: 'topic-animals',
      component: () => import('../views/AnimalsView.vue')
    },
    {
      path: '/topic/pronouns',
      name: 'topic-pronouns',
      component: () => import('../views/PronounsView.vue')
    }
  ]
})

export default router
