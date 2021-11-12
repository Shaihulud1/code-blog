<template>
  <div class="cancel-orders">
    <div
      v-for="order in cancelations"
      :key="order.entityId"
      class="import__item"
    >
      <div class="import__item__inner">
        <div class="import__item__desc">
          <h4>{{ order.desc }}</h4>
        </div>
        <div class="import__item__launch">
          <Button
            v-tooltip="'Подтвердить'"
            label=""
            class="p-button-success p-button-rounded"
            icon="pi pi-check"
            @click="makeDesicion(order.entityId, true)"
          />
          <Button
            v-tooltip="'Отменить'"
            label=""
            class="p-button-danger p-button-rounded"
            icon="pi pi-times"
            @click="makeDesicion(order.entityId, false)"
          />
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import ViAxios from '@/modules/ViAxios'
import { CancelationOrder } from './types'
import { useToast } from "primevue/usetoast";

export default defineComponent({
    setup() {
		const toast = useToast();
		const cancelations: Ref<CancelationOrder[]> = ref([])
		const fetchCancelations = async () => {
			const req = await ViAxios<CancelationOrder[]>({
				method: 'get',
				url: '/api/order-cancelation/list',
			})
			cancelations.value = [...req.response]
    	}
    	onMounted(async () => fetchCancelations())

		const makeDesicion = async (orderId: string, decision: boolean) => {
			const req = ViAxios({
				method: 'post',
				url: '/api/order-cancelation/decision',
				body: { 
					entityId: orderId,
					decision
				}
			})
			const response = await req
			if (response.code === 202) {
				cancelations.value = cancelations.value.filter(item => item.entityId !== orderId)
			} else {
				toast.add({
					severity:'error', 
					summary: 'Ошибка подтверждения отмены', 
					detail: response.error?.message ?? 'Неизвестная ошибка', 
					life: 3000
				});
			}
		}
 
        return { cancelations, makeDesicion}
    }
})
</script>