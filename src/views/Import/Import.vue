<template>
  <div class="import">
    <div
      v-for="im in imports"
      :key="im.method"
      class="import__item"
    >
      <div class="import__item__inner">
        <div class="import__item__desc">
          <h4>{{ im.name }}</h4>
          <div>{{ im.desc }}</div>
        </div>
        <div class="import__item__launch">
          <Button 
            :loading="loading.includes(im.method)" 
            loading-icon="pi pi-spinner pi-spin" 
            label="Запуск"
            @click="launchImport(im.method)"
          />
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<script lang="ts">
import ViAxios from "@/modules/ViAxios";
import { defineComponent, ref, Ref } from "vue";
import { ImportType } from './types'

export default defineComponent({
    setup() {
        const imports: ImportType[] = [
            {
                name: 'Аптеки',
                desc: 'Импорт аптек из 1с в базу данных постгри',
                method: 'pharm'
            },
            {
                name: 'Пользователи',
                desc: 'Импорт пользователей из 1с в базу данных постгри',
                method: 'user'
            },
            {
                name: 'Задачи',
                desc: 'Импорт задач из 1с в базу данных постгри',
                method: 'order'
            },
        ]
        
        const loading: Ref<string[]> = ref([])
        
        const launchImport = async (method: string) => {
            loading.value.push(method)
            const req = await ViAxios({
                method: 'get',
                url: `/api/import/${method}`,
            })
            if (req.error) {
                alert('Произошла ошибка');
            }
            loading.value = loading.value.filter(e => e !== method)
        }

        return {imports, launchImport, loading}
    }

});
</script>

<style lang="scss">

</style>