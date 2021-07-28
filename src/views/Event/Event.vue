<template>
  <div class="user-wrapp">
    <DataTable
      v-model:selection="selected"
      :value="eventFiltered"
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
            placeholder="Поиск по пользователю"
          />
        </span>
      </template>
      <Column
        header="Пользователь"
        style="width:25%"
      >
        <template #body="slotProps">
          <span class="image-text">{{ slotProps.data.initiator.fullName }}</span>
        </template>
      </Column>
      <Column
        header="Тип"
        style="width:25%"
      >
        <template #body="slotProps">
          <span class="image-text">{{ slotProps.data.type }}</span>
        </template>
      </Column>
      <Column
        header="payload"
        style="width:25%"
      >
        <template #body="slotProps">
          <span class="image-text">{{ slotProps.data.payload }}</span>
        </template>
      </Column>
      <template #empty>
        События не найдены
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
      
      const { result, loading, error  } = useQuery(gql`
        query getEvents {
            events {
                id
                createdAt
                initiator {
                    id
                    fullName
                }
                nodeId
                notifiedAt
                payload
                type
                updatedAt
            }
        }
      `)
      const events = useResult(result)

      const eventFiltered = computed(() => {
        return events.value ? events.value.filter((e: any) => e.initiator.fullName.includes(search.value)) : []
      })

      return { 
        eventFiltered, error, loading, selected, search, 
      }
    },
})
</script>

<style>

</style>