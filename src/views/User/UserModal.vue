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
          Имя : Имя
          Дата рождения : 05.05.1999
          Телефон : 05.05.1999
          Создан : 05.05.2021
          Обновлен : 05.05.2020
        </TabPanel>
        <TabPanel header="Должность">
          Content 2
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, watch } from 'vue'
import gql from 'graphql-tag'
import { useQuery, useResult } from '@vue/apollo-composable';

export default defineComponent({
    props: {
        selectedId: String,
    },
    setup(props) {
        const selected = ref(props.selectedId)
        const { result, loading, error  } = useQuery(gql`
        query getUser($id: UUID!) {
            user(id: $id) {
                id
                fullName
            }
        }`, () => ({
            id: selected.value
        }))
        const user = useResult(result)

        const activeTab = ref(0)

        return { user, loading, activeTab }
    },
    watch: {
        selectedId(val) {
            console.log('selWatch', val)
        }
    }

})
</script>

<style>
    .loader-wrapper {
        text-align: center;
    }
</style>