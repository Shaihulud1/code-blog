<template>
  <div class="basic-wrapper">
    <Sidebar
      v-model:visible="isMenuVisible"
      position="left"
    >
      <PanelMenu :model="menu" />
    </Sidebar>

    <div class="top-menu">
      <div class="top-menu__menu top-menu__item">
        <a @click="isMenuVisible = !isMenuVisible"><i class="pi pi-bars" /></a>
      </div>
      <div class="top-menu__profile top-menu__item">
        <a href="">Администратор</a>
      </div>
    </div>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint nesciunt ipsa at.
      Autem error commodi eum placeat esse perspiciatis delectus sunt rem, aut velit alias architecto.
      In numquam facere culpa!
    </p>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const isMenuVisible = ref(false)
    const menu = ref([
      {
        label: 'Главная',
        icon: 'pi pi-fw pi-home'
      },
      {
        label: 'Пользователи',
        icon: 'pi pi-fw pi-user'
      },
      {
        label: 'Аптеки',
        icon: 'pi pi-fw pi-plus-circle'
      },
      {
        label: 'Система',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'События',
            icon: 'pi pi-fw pi-calendar-times'
          }
        ]
      }
    ])
    return { menu, isMenuVisible }
  }
})
</script>

<style>
	a {
		text-decoration: none;
		cursor: pointer;
		color: black
	}
	.top-menu {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: 50px;
	}
	.top-menu__profile {
		justify-self: end;
		margin-top: 15px;
	}
	.top-menu__menu i {
		font-size: 35px;
	}
	.top-menu__item {
		align-items: center;
		justify-items: center;
		align-content: center;
		grid-auto-flow: column;
	}
</style>
