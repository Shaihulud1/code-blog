<template>
  <div class="user-wrapp">
    <DataTable
      v-model:filters="filter"
      v-model:selection="selected"
      :value="userFiltered"
      :paginator="false"
      selection-mode="single"
      data-key="id"
      state-storage="local"
      state-key="dt-state-demo-local"
      responsive-layout="scroll"
      :loading="loading"
    >
      <template #header>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="search"
            placeholder="Поиск по имени"
          />
        </span>
      </template>
      <Column
        header="Действие"
        style="width:25%"
      >
        <template #body="slotProps">
          <Button @click="openUserModal(slotProps.data.id)">
            Открыть
          </Button>
        </template>
      </Column>
      <Column
        header="Имя"
        style="width:25%"
      >
        <template #body="slotProps">
          <span class="image-text">{{ slotProps.data.fullName }}</span>
        </template>
      </Column>
      <Column
        header="Телефон"
        style="width:25%"
      >
        <template #body="slotProps">
          <span class="image-text">{{ slotProps.data.phone }}</span>
        </template>
      </Column>
      <template #empty>
        Пользователи не найдены
      </template>
    </DataTable>
    <Message
      v-if="error"
      severity="error"
    >
      {{ error.message }}
    </Message>
    <Dialog
      v-model:visible="displayModal"
      header=""
      :style="{width: '75vw'}"
      :modal="true"
      position="top"
    >
      <UserModal v-model:selectedId="selectedId" />
    </Dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import gql from 'graphql-tag'
import { useQuery, useResult } from '@vue/apollo-composable';
import { UserListItem } from './types'
import UserModal from './UserModal.vue'

export default defineComponent({
    components: {UserModal},
    setup() {
      let displayModal: Ref<boolean> = ref(false)

      const selected = ref()
      const selectedId: Ref<string> = ref("")
      const search: Ref<string> = ref("")
      const filter = ref({global: {value: null, matchMode: FilterMatchMode.CONTAINS}});
      
      const { result, loading, error  } = useQuery(gql`
        query getUsers {
          users {
            id,
            fullName,
            phone,
          }
        }
      `)
      let users = useResult(result)

      const userFiltered = computed(() => {
        return users.value ? users.value.filter((e:UserListItem) => e.fullName.includes(search.value)) : []
      })

      const openUserModal = (id: string) => {
        selectedId.value = id
        displayModal.value = true
      }

      return { 
        userFiltered, error, loading, selected, search, filter, openUserModal, displayModal, selectedId
      }
    }
})
</script>

<style>

</style>