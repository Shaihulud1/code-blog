<template>
  <div class="cancel-orders">
    <div
      v-for="order in cOrders"
      :key="order.name"
      class="import__item"
    >
      <div class="import__item__inner">
        <div class="import__item__desc">
          <h4>Сотрудник Имя Фамилия Отчество хочет отменить смену</h4>
        </div>
        <div class="import__item__launch">
          <Button
            v-tooltip="'Подтвердить'"
            label=""
            class="p-button-success p-button-rounded"
            icon="pi pi-check"
          />
          <Button
            v-tooltip="'Отменить'"
            label=""
            class="p-button-danger p-button-rounded"
            icon="pi pi-times"
          />
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
    setup() {
        const cOrders = [
            {
                name: 'Отмена 1',
                desc: 'Описание'
            },
            {
                name: 'Отмена 1',
                desc: 'Описание'
            },
            {
                name: 'Отмена 1',
                desc: 'Описание'
            },
        ]
        return { cOrders }
    }
})
</script>