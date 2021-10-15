<template>
  <div class="schedule-wrapp">
    <FullCalendar
      :events="schedules"
      :options="options"
    />
    <Dialog
      v-model:visible="timeModal"
      header="Время смены"
      :style="{width: '40vw', minWidth: '300px'}"
      :modal="true"
      position="center"
    >
      <TimeModal
        v-model:order="orderSelect"
        @timeSaved="timeModal = false"
      />
    </Dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import '@fullcalendar/core'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import TimeModal from './TimeModal.vue'
import ScheduleCalendar from '@/services/ScheduleService/ScheduleCalendar'

export default defineComponent({
    components: {TimeModal},
    setup() {
        const { schedules, orderSelect, timeModal, eventDrop, eventClick } = ScheduleCalendar()
        const options = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            initialDate : new Date,
            headerToolbar: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            locale: 'ru',
            editable: true,
            selectable:true, 
            selectMirror: true,
            droppable: true,
            allDayMaintainDuration: true,
            eventStartEditable: true,
            eventDurationEditable: true,
            event: true,
            eventDrop,
            eventClick
        }
        return { schedules, options, timeModal, orderSelect }
    }
})

</script>

<style lang="scss">
.schedule-wrapp {
    a { 
        color: white !important
    }
}
</style>