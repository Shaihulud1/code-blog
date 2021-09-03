<template>
  <div class="schedule-wrapp">
    <FullCalendar
      :events="shedule"
      :options="options"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from 'vue'
import '@fullcalendar/core'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ViAxios from '@/modules/ViAxios';

export default defineComponent({
    setup() {
        const shedule = ref([
            {"id": 1,"title": "All Day Event","start": "2017-02-01"},
            {"id": 2,"title": "Long Event","start": "2017-02-07","end": "2017-02-10"},
        ])
        const options = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            initialDate : '2017-02-01',
            headerToolbar: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            locale: 'ru',
            editable: true,
            selectable:true, 
            selectMirror: true, 
            dayMaxEvents: true,
        }

        onMounted(async () => {
            const schedules = await ViAxios({
                method: 'get',
                url: '/api/pharm-manager/schedules',
            })
            console.log(schedules)
        })

        return { shedule, options }
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