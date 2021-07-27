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
    path: '/main',
    name: 'Main',
    meta: {
      title: 'Админ панель'
    },
    component: () => import('../views/Main.vue')
  },
  {
    path: '/users',
    name: 'User',
    meta: {
      title: 'Пользователи'
    },
    component: () => import('../views/User.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
