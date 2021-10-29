import ViAxios from "@/modules/ViAxios";
import { onMounted, ref } from "vue";
import { Order } from "@/services/OrderService/types";
import { date2TimeZone } from '@/modules/TimeZone'


const TimeModal = (props: any, emit: any) => {
    const fromTime = ref()
    const toTime = ref()
    const timeZone = 3
    const timePattern = 'HH:mm'

    const saveOrder = async () => {
        const from = fromTime.value instanceof Date ? `${fromTime.value.getHours()}:${fromTime.value.getMinutes()}` : fromTime.value
        const to = toTime.value instanceof Date ? `${toTime.value.getHours()}:${toTime.value.getMinutes()}` : toTime.value
        const request = await ViAxios({
            method: 'post',
            url: '/api/pharm-manager/schedule/switch-date',
            body: { 
                from, 
                to, 
                orderId: props.order.id,
                timeZone,
                orderDate: props.order.orderDate,
            }
        })
        if (request.code !== 200) {
            emit('timeError', request.error?.message)
        } else {
            emit('timeSaved')
        }
    }
    onMounted(async () => {
        const orderReq = await ViAxios<Order>({
            method: 'get',
            url: `/api/orders/${props.order.id}/full`
        })
        fromTime.value = date2TimeZone(orderReq.response.orderDate, timeZone, timePattern)
        toTime.value = date2TimeZone(orderReq.response.orderTo, timeZone, timePattern)
    })
    return {saveOrder, fromTime, toTime }; 
}

export default TimeModal