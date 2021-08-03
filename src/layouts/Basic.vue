<template>
  <Sidebar
    v-model:visible="isMenuVisible"
    class="side-menu"
    position="left"
  >
    <PanelMenu :model="menu" />
  </Sidebar>

  <div class="top-menu">
    <div class="top-menu__menu top-menu__item">
      <a
        class="vi-title"
        @click="isMenuVisible = !isMenuVisible"
      ><i class="pi pi-bars" /></a>
    </div>
    <div class="top-menu__profile top-menu__item">
      <a class="vi-title menu-text">{{ userData?.fullName }}</a>
      <a
        class="vi-text menu-text"
        @click="logOut"
      >Выйти</a>
    </div>
  </div>
  <div class="basic-content">
    <h1 class="content-page-title vi-title">
      {{ pageTitle }}
    </h1>
    <hr>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from 'vue'
import { useRoute } from "vue-router"
import router from '@/router'
import ViAxios from '@/modules/ViAxios'
import store from '@/store'

export default defineComponent({
  setup () {
    type UserDataType = {
      id: string,
      fullName: string,
    }
    const userData = ref()
    const getUserData = async () => {
      const req = await ViAxios<UserDataType>({
        method: 'get',
        url: '/api/user/profile',
      })
      userData.value = await req.response
      await store.dispatch('setUserData', userData.value)
    }
    onMounted(getUserData)

    const isMenuVisible = ref(false)
    const routeMenu = (to: string) => {
      isMenuVisible.value = false
      router.push(to)
    }
    const menu = ref([
      {
        label: 'Главная',
        icon: 'pi pi-fw pi-home',
        //url: '/main',
        command:() => { 
          routeMenu('/main')
        }
      },
      {
        label: 'Пользователи',
        icon: 'pi pi-fw pi-user',
        command:() => { 
          routeMenu('/users')
        }
      },
      {
        label: 'Задачи',
        icon: 'pi pi-fw pi-check',
        command:() => { 
          routeMenu('/orders')
        }
      },
      {
        label: 'Аптеки',
        icon: 'pi pi-fw pi-plus-circle',
        command:() => { 
          routeMenu('/pharms')
        }
      },
      {
        label: 'Система',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'События',
            icon: 'pi pi-fw pi-calendar-times',
            command:() => { 
              routeMenu('/events')
            }
          },
          {
            label: 'Импорты',
            icon: 'pi pi-fw pi-cloud-download',
            command:() => { 
              routeMenu('/imports')
            }
          }
        ]
      }
    ])
    const logOut = () => {
      store.dispatch('setRefreshToken', "")
      store.dispatch('setUserData', undefined)
      router.push('/')
    }
    return { menu, isMenuVisible, userData, getUserData, logOut }
  },
  computed: {
    pageTitle() {
      const route = useRoute();
      return route.meta.title
    }  
  }
})
</script>

<style lang="scss">
  .content-page-title {
    text-align: right;
  }
  .p-sidebar-content {
    padding: 0 !important;
  }

  .basic-content {
    margin: 5%
  }
	a {
		text-decoration: none;
		cursor: pointer;
		color: black
	}
	.top-menu {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: 60px;
    background-color: $topBGColor;
    width: 100vw;
		&__profile {
			justify-self: end;
      margin-right: 30px;
      margin-top: 20px;
		}
		&__menu {
      margin-top: 15px;
      margin-left: 30px;
      i {
        font-size: 35px;
      }
			
		}
		&__item {
			align-items: center;
			justify-items: center;
			align-content: center;
			grid-auto-flow: column;
		}
	}
  .menu-text {
    margin-left: 20px;
  }
</style>
