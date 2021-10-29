import { ref, Ref, onMounted } from 'vue'
import ViAxios from '@/modules/ViAxios';
import { ScheduleCalendarType } from './types'
import { UserScheduleType } from '@/services/UserService/types'
import { OrderDrag } from '@/services/OrderService/types'
import { date2TimeZone } from '@/modules/TimeZone'
import { useToast } from "primevue/usetoast";

const ScheduleCalendar = () => {
    const toast = useToast();
    const schedules: Ref<ScheduleCalendarType[]> = ref([])
    const timeZone = 3
    const fetchSchedule = async () => {
        const apiSchedules = await ViAxios<UserScheduleType[]>({
            method: 'get',
            url: '/api/pharm-manager/schedule/list',
        })
        schedules.value = apiSchedules.response.map((userSchedule: UserScheduleType) => {
            const timeStart = date2TimeZone(userSchedule.orderDate, timeZone)
            const timeEnd = date2TimeZone(userSchedule.orderTo, timeZone)
            return {
                id: userSchedule.id,
                title: userSchedule.serviceNumber.user.fullName,
                start: timeStart,
                end: timeEnd
            }
        })
    }
    onMounted(async () => fetchSchedule())

    const orderSelect: Ref<OrderDrag> = ref({
        id: "",
        from: new Date,
        to: new Date,
        orderDate: '',
    })

    const timeModal = ref(false)

    const eventDrop = (info: any) => {
        orderSelect.value.id = info.event._def.publicId
        orderSelect.value.orderDate = date2TimeZone(info.event._instance.range.start, 0)
        timeModal.value = true
    }
    
    const eventClick = (info: any) => {
        orderSelect.value.id = info.event._def.publicId
        orderSelect.value.orderDate = date2TimeZone(info.event._instance.range.start, 0)
        timeModal.value = true
    }

    const timeError = (message: string) => {
        toast.add({severity:'error', summary: 'Ошибка смены графика', detail: message, life: 3000});

        timeModal.value = false
        fetchSchedule()
        console.log(message)
    }


    return { schedules, orderSelect, timeModal, eventDrop, eventClick, timeError }
}

export default ScheduleCalendar