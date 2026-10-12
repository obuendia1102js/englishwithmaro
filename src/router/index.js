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
      path: '/exam/:levelId',
      name: 'exam',
      component: () => import('../views/ExamView.vue')
    },
    {
      path: '/topic/animals',
      name: 'topic-animals',
      component: () => import('../views/AnimalsView.vue')
    },
    {
      path: '/topic/food-colors',
      name: 'topic-food-colors',
      component: () => import('../views/FoodColorsView.vue')
    },
    {
      path: '/topic/objects',
      name: 'topic-objects',
      component: () => import('../views/ObjectsView.vue')
    },
    {
      path: '/topic/pronouns',
      name: 'topic-pronouns',
      component: () => import('../views/PronounsView.vue')
    },
    {
      path: '/topic/reading-dinosaurs',
      redirect: '/reading/toby-dinosaur'
    },
    {
      path: '/reading/:storyId',
      name: 'reading-story',
      component: () => import('../views/StoryReadingView.vue')
    }
  ]
})

export default router
