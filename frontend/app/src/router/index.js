import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Feed from '../views/Feed.vue'
const routes = [
  {
    path: '/',
    name: 'feed',
    component: Feed
  },
  {
    path: '/login',
    name: 'Login',
    component: function () {
      return import( '../views/Login.vue')
    }

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router