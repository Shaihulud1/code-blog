<template>
  <div class="user-wrapp">
    <DataTable
      v-model:filters="filter"
      v-model:selection="selected"
      :value="orderFiltered"
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
            placeholder="Поиск по отвественному"
          />
        </span>
      </template>
      <Column
        header="Ответственный"
        style="width:25%"
      >
        <template #body="slotProps">
          <span class="image-text">{{ slotProps.data.serviceNumber.user.fullName }}</span>
        </template>
      </Column>
      <Column
        header="Дата"
        style="width:25%"
      >
        <template #body="slotProps">
          <span class="image-text">{{ slotProps.data.orderDate }}</span>
        </template>
      </Column>
      <Column
        header="Время"
        style="width:25%"
      >
        <template #body="slotProps">
          <span class="image-text">{{ slotProps.data.time }}</span>
        </template>
      </Column>
      <Column
        header="Статус"
        style="width:25%"
      >
        <template #body="slotProps">
          <span class="image-text">{{ slotProps.data.status }}</span>
        </template>
      </Column>
      <template #empty>
        Задачи не найдены
      </template>
    </DataTable>
    <Message
      v-if="error"
      severity="error"
    >
      {{ error.message }}
    </Message>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import gql from 'graphql-tag'
import { useQuery, useResult } from '@vue/apollo-composable';

export default defineComponent({
    setup() {
      const selected = ref()
      const search: Ref<string> = ref("")
      const filter = ref({global: {value: null, matchMode: FilterMatchMode.CONTAINS}});
      
      const { result, loading, error  } = useQuery(gql`
        query getOrders {
          orders {
            id,
            serviceNumber {
                id,
                user {
                    id,
                    fullName
                }
            },
            status,
            orderDate,
            time,
          }
        }
      `)
      let orders = useResult(result)

      const orderFiltered = computed(() => {
        return orders.value ? orders.value.filter((e: any) => e.serviceNumber.user.fullName.includes(search.value)) : []
      })

      return { 
        orderFiltered, error, loading, selected, search, filter, 
      }
    },
})
</script>

<style>

</style>