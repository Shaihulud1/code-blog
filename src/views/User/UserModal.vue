<template>
  <div>
    <div
      v-if="loading"
      class="loader-wrapper"
    >
      <ProgressSpinner />
    </div>
    <div v-else>
      <TabView v-model:activeIndex="activeTab">
        <TabPanel header="Общая информация">
          <div class="info">
            <div class="info__item">
              Имя : {{ user.fullName }}
            </div>
            <div class="info__item">
              Телефон : {{ user.phone }}
            </div>
            <div class="info__item">
              Дата рождения : {{ formatDateStr(user.dateOfBirth) }}
            </div>
            <div class="info__item">
              Создан : {{ formatDateStr(user.createdAt) }}
            </div>
            <div class="info__item">
              Обновлен : {{ formatDateStr(user.updatedAt) }}
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Должности">
          <DataTable :value="user.serviceNumbers">
            <Column
              field="position"
              header="Должность"
            />
            <Column
              field="bid"
              header="Ставка"
            />
          </DataTable>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import gql from 'graphql-tag'
import { useQuery, useResult } from '@vue/apollo-composable';
import { formatDateStr } from '@/modules/ViHelper/DateHelper'

export default defineComponent({
    props: {
        selectedId: String,
    },
    setup(props) {
        const selected = ref(props.selectedId)
        const { result, loading } = useQuery(gql`
        query getUser($id: UUID!) {
            user(id: $id) {
                id,
                fullName,
                dateOfBirth,
                updatedAt,
                createdAt,
                serviceNumbers {
                  position,
                  bid
                },
                phone
            }
        }`, () => ({
            id: selected.value
        }))
        const user = useResult(result)

        const activeTab = ref(0)

        return { user, loading, activeTab, formatDateStr }
    },
    watch: {
        selectedId(val) {
            console.log('selWatch', val)
        }
    }

})
</script>

<style lang="scss">
    .loader-wrapper {
        text-align: center;
    }
    .info {
      &__item {
        margin-bottom: 10px;
      }
    }
</style>