import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

type Route = RouteRecordRaw & {
    path: string,
    name: string,
    meta: {
      title: string,
      layout?: string
    },
    component: () => void
}

const routes: Route[] = [
  {
    path: '/',
    name: 'Auth',
    meta: {
      title: 'Авторизация',
      layout: 'Auth'
    },
    component: () => import('../views/Auth.vue')
  },
  {
    path: '/home',
    name: 'About',
    meta: {
      title: 'Главная'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
