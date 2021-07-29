<template>
  <div class="user-wrapp">
    <Toolbar class="p-mb-4">
      <template #left>
        <Button
          label="Создать"
          icon="pi pi-plus"
          class="p-button-success p-mr-2"
          @click="openModal('new')"
        />
        <!-- <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" /> -->
      </template>

      <!-- <template #right>
          <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
          <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
      </template> -->
    </Toolbar>

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
          <span class="image-text">{{ formatDateStr(slotProps.data.orderDate) }}</span>
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
        header="Аптека"
        style="width:25%"
      >
        <template #body="slotProps">
          <span class="image-text">{{ slotProps.data.pharm.id }}</span>
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
    <Dialog
      v-model:visible="displayModal"
      header=""
      :style="{width: '75vw'}"
      :modal="true"
      position="top"
    >
      <OrderModal
        v-model:selectedId="selectedId"
        @orderSaved="orderSaved"
      />
    </Dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watch } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import gql from 'graphql-tag'
import { useQuery, useResult } from '@vue/apollo-composable';
import OrderModal from './OrderModal.vue'
import { formatDateStr } from '@/modules/ViHelper/DateHelper'


export default defineComponent({
    components: {OrderModal},
    setup() {
      const selectedId: Ref<string> = ref("new")
      const displayModal: Ref<boolean> = ref(false)
      const selected = ref()
      const search: Ref<string> = ref("")
      const filter = ref({global: {value: null, matchMode: FilterMatchMode.CONTAINS}});
      
      const { result, loading, error, refetch } = useQuery(gql`
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
            pharm {
              id
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
  
      const openModal = (typeModal: string) => {
        displayModal.value = true
        selectedId.value = typeModal
      }

      const orderSaved = () => {
        displayModal.value = false
        refetch()
      }


      return { 
        orderFiltered, error, loading, selected, search, filter, selectedId, openModal, 
        displayModal, orderSaved, refetch, formatDateStr
      }
    },
})
</script>

<style>

</style>