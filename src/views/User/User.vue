<template>
  <div class="user-wrapp">
    <DataTable
      v-model:filters="filter"
      v-model:selection="selected"
      :value="users"
      :paginator="true"
      :rows="10"
      selection-mode="single"
      data-key="id"
      state-storage="local"
      state-key="dt-state-demo-local"
      responsive-layout="scroll"
    >
      <template #header>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="filter['global'].value"
            placeholder="Поиск по имени и телефону"
          />
        </span>
      </template>
      <Column
        header="Имя"
        :sortable="true"
        sort-field="fullName"
        filter-field="fullName"
        filter-match-mode="contains"
        style="width:25%"
      >
        <template #body="slotProps">
          <span class="image-text">{{ slotProps.data.fullName }}</span>
        </template>
        <template #filter>
          <InputText
            v-model="filter['fullName']"
            type="text"
            class="p-column-filter"
            placeholder="Search by country"
          />
        </template>
      </Column>
      <Column
        header="Телефон"
        :sortable="true"
        sort-field="phone"
        filter-field="phone"
        filter-match-mode="contains"
        style="width:25%"
      >
        <template #body="slotProps">
          <span class="image-text">{{ slotProps.data.phone }}</span>
        </template>
        <template #filter>
          <InputText
            v-model="filter['phone']"
            type="text"
            class="p-column-filter"
            placeholder="Search by country"
          />
        </template>
      </Column>
      <template #empty>
        Пользователи не найдены
      </template>
    </DataTable>
    <div
      v-for="user in usersG"
      :key="user.id"
    >
      {{ user.id }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue'
import { UserListItem } from './types'
import { FilterMatchMode } from 'primevue/api'
import gql from 'graphql-tag'
import {useQuery} from '@vue/apollo-composable'

export default defineComponent({
    setup() {
      const users: Ref<UserListItem[]> = ref([
        {
          id: "132",
          fullName: "Vasya",
          phone: "+79025817274"
        },
        {
          id: "134",
          fullName: "Vasya2",
          phone: "+79025817275"
        },
      ])
      const selected = ref()
      const search: Ref<string> = ref("")

      const filter = ref({global: {value: null, matchMode: FilterMatchMode.CONTAINS}});
      const query = gql`query MyQuery {
        users {
          id
        }
      }`
      const usersG = useQuery(query)
      console.log(usersG)

      return { users, selected, search, filter }
    },
    apollo: {
      usersG: gql`query MyQuery {
              users {
                id
              }
            }`
    }
})
</script>

<style>

</style>