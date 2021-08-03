<template>
  <div class="user-wrapp">
    <DataTable
      v-model:selection="selected"
      :value="pharmFiltered"
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
            placeholder="Поиск по номеру"
          />
        </span>
      </template>
      <Column
        header="Номер"
        style="width:25%"
      >
        <template #body="slotProps">
          <span class="image-text">{{ slotProps.data.id }}</span>
        </template>
      </Column>
      <Column
        header="Адрес"
        style="width:25%"
      >
        <template #body="slotProps">
          <span class="image-text">{{ slotProps.data.address }}</span>
        </template>
      </Column>
      <template #empty>
        Аптеки не найдены
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
import gql from 'graphql-tag'
import { useQuery, useResult } from '@vue/apollo-composable';

export default defineComponent({
    setup() {
      const selected = ref()
      const search: Ref<string> = ref("")
      
      const { result, loading, error, refetch  } = useQuery(gql`
        query getPharms {
          pharms {
            id,
            address
          }
        }
      `)
      refetch()
      const pharms = useResult(result)

      const pharmFiltered = computed(() => {
        return pharms.value ? pharms.value.filter((e: any) => e.id.includes(search.value)) : []
      })

      return { 
        pharmFiltered, error, loading, selected, search, 
      }
    },
})
</script>

<style>

</style>