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
    component: () => import('../views/Auth/Auth.vue')
  },
  {
    path: '/main',
    name: 'Main',
    meta: {
      title: 'Админ панель'
    },
    component: () => import('../views/Main/Main.vue')
  },
  {
    path: '/users',
    name: 'User',
    meta: {
      title: 'Пользователи'
    },
    component: () => import('../views/User/User.vue')
  },
  {
    path: '/orders',
    name: 'Order',
    meta: {
      title: 'Задачи'
    },
    component: () => import('../views/Order/Order.vue')
  },
  {
    path: '/pharms',
    name: 'Pharm',
    meta: {
      title: 'Аптеки'
    },
    component: () => import('../views/Pharm/Pharm.vue')
  },
  {
    path: '/pharm-management/schedules',
    name: 'PharmManagementSchedules',
    meta: {
      title: 'Расписания смен'
    },
    component: () => import('../views/Pharm/PharmManagement.vue')
  },
  {
    path: '/pharm-management/checkins',
    name: 'PharmManagementCheckins',
    meta: {
      title: 'Чекины'
    },
    component: () => import('../views/Pharm/Checkin.vue')
  },
  {
    path: '/events',
    name: 'Event',
    meta: {
      title: 'События'
    },
    component: () => import('../views/Event/Event.vue')
  },
  {
    path: '/imports',
    name: 'Import',
    meta: {
      title: 'Импорты'
    },
    component: () => import('../views/Import/Import.vue')
  },
  {
    path: '/pharm-management/cancel-orders',
    name: 'CancelOrders',
    meta: {
      title: 'Подтверждение отмены заказов'
    },
    component: () => import('../views/Pharm/CancelOrders.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
