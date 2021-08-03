<template>
  <Badge
    type="button"
    :value="badgeData.ruName"
    :severity="badgeData.color"
  />
</template>

<script>
import { ref } from 'vue'

export default {
    props: {
        code: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const badgeData = ref({
            ruName: 'Создан',
            color: 'warning'
        })
        switch (props.code) {
            case 'BOOKED': 
                badgeData.value.ruName = 'Забронирован'
                badgeData.value.color = 'info'
                break
            case 'CREATED': 
                badgeData.value.ruName = 'Создан'
                badgeData.value.color = 'warning'
                break
            case 'CONFIRMED': 
                badgeData.value.ruName = 'Подтвержден'
                badgeData.value.color = 'success'
                break
            case 'IN_PLACE': 
                badgeData.value.ruName = 'На месте'
                badgeData.value.color = 'default'
                break
            case 'CANCELED': 
                badgeData.value.ruName = 'Отменено'
                badgeData.value.color = 'danger'
                break
            case 'DONE': 
                badgeData.value.ruName = 'Закрыт'
                badgeData.value.color = 'success'
                break
            case 'DRAFT':
                badgeData.value.ruName = 'Подвешен'
                badgeData.value.color = 'info'
                break
        }
        return { badgeData }
    }
}
</script>

<style>

</style>