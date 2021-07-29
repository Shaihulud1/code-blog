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
      <a class="vi-title">{{ userData.fullName }}</a>
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
import { defineComponent, ref } from 'vue'
import { useRoute } from "vue-router"
import router from '@/router'
import gql from 'graphql-tag'
import { useQuery, useResult } from '@vue/apollo-composable';
import ViAxios from '@/modules/ViAxios'
export default defineComponent({
  setup () {
    type UserDataType = {
      id: string,
      fullName: string,
    }
    const userData = ref(ViAxios<UserDataType>({
      method: 'get',
      url: '/api/user/profile',
    }))
    ///api/user/profile
      //       const { result, loading } = useQuery(gql`
      // query getUser($id: UUID!) {
      //     user(id: $id) {
      //         id
      //         fullName
      //         serviceNumbers {
      //           position,
      //           bid
      //         }
      //     }
      // }`, () => ({
      //     id: selected.value
      // }))

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
          }
        ]
      }
    ])
    console.log('1us1', userData.value)
    return { menu, isMenuVisible, userData }
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
</style>
