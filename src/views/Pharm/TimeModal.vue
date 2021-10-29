
<template>
  <div v-if="order">
    <Calendar 
      id="workTime"
      v-model="fromTime"
      :show-time="true"
      :time-only="true"
      hour-format="24"
      placeholder="От"
    />
    <Calendar
      id="workTime"
      v-model="toTime"
      :show-time="true"
      :time-only="true"
      hour-format="24"
      placeholder="До"
    />
    <Button
      label="Сохранить"
      @click="saveOrder()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { OrderDrag, Order } from '@/services/OrderService/types';
import TimeModal from '@/services/ScheduleService/TimeModal'

export default defineComponent ({
    props: {
        order: {
            type: Object as () => OrderDrag,
            default: {
                id: "",
                from: new Date,
                to: new Date,
                orderDate: new Date,
            }
        },
    },
    emits: ['timeSaved', 'timeError'],
    setup(props, { emit }) {
        const {saveOrder, fromTime, toTime } = TimeModal(props, emit)
        return {saveOrder, fromTime, toTime}; 
    }
})
</script>
