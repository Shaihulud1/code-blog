<template>
  <div>
    <div
      v-if="modalLoading"
      class="loader-wrapper"
    >
      <ProgressSpinner />
    </div>
    <div v-else>
      <div class="p-fluid form-edit">
        <div class="p-field form-edit__item">
          <label for="employer">Номер сотрудника</label>
          <Dropdown
            id="employer"
            v-model="selectedSN"
            :options="snSelect"
            :loading="loadingSNSelect"
            option-label="id"
          > 
            <template #value="slotProps">
              <div
                v-if="slotProps.value"
                class="p-dropdown-car-value"
              >
                <span>{{ slotProps.value.user.fullName }} {{ slotProps.value.id }} ({{ slotProps.value.position }})</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="p-dropdown-car-option">
                <span>{{ slotProps.option.user.fullName }} {{ slotProps.option.id }} ({{ slotProps.option.position }})</span>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="p-field form-edit__item">
          <label for="pharm">Аптека</label>
          <Dropdown
            id="pharm"
            v-model="selectedPharm"
            :options="pharmsSelect"
            :loading="loadingPharmSelect"
            option-label="id"
          />
        </div>
        <div class="p-field form-edit__item">
          <label for="work-time">Время работы</label>
          <Calendar
            id="workTime"
            v-model="timeAt"
            :show-time="true"
            :time-only="true"
            hour-format="24"
            placeholder="От"
          />
          <Calendar
            id="workTime"
            v-model="timeTo"
            :show-time="true"
            :time-only="true"
            hour-format="24"
            placeholder="До"
          />
        </div>
        <div class="p-field form-edit__item">
          <label for="date">Дата</label>
          <Calendar
            id="date"
            v-model="orderDate"
          />
        </div>
        <div class="p-field form-edit__item">
          <label for="description">Описание</label>
          <InputText
            id="description"
            v-model="description"
            type="text"
          />
        </div>
        <div
          v-if="canSave"
          class="p-field form-edit__item"
        >
          <Button
            label="Сохранить"
            @click="createOrder()"
          />
        </div>
        <div
          v-for="(message, index) in errors"
          :key="index"
        >
          <Message severity="error">
            {{ message }}
          </Message>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import gql from 'graphql-tag'
import ViAxios from '@/modules/ViAxios'
import { useQuery, useResult } from '@vue/apollo-composable';
import { timeSeparate } from '@/modules/ViHelper/DateHelper'
import store from '@/store'

export default defineComponent({
    props: {
        selectedId: String,
    },
    setup(props, { emit }) {
        const selected = ref(props.selectedId)
        const { result: resultSNSelect, loading: loadingSNSelect } = useQuery(gql`
            query getSeviceNumbers {
                serviceNumbers {
                    id,
                    position
                    user {
                        id,
                        fullName
                    },
                }
            }
        `)
        const snSelect = useResult(resultSNSelect)
        const snLabel = (e) => {
            return e.id
        }

        const { result: resultPharmSelect, loading: loadingPharmSelect } = useQuery(gql`
            query getPharms {
                pharms {
                    id,
                }
            }
        `)
        const pharmsSelect = useResult(resultPharmSelect)

        const selectedSN = ref("")
        const selectedPharm = ref("")
        const timeAt = ref("")
        const timeTo = ref("")
        const orderDate = ref("")
        const description = ref("")
      
        const errors = ref([])
        const loading = ref(false)
          
        const { result: orderEditResult, loading: orderLoading, refetch } = useQuery(gql`
            query getOrder($id: UUID!) {
              order(id: $id) {
                id,
                serviceNumber {
                  id,
                  position,
                  user {
                    id,
                    fullName
                  }
                },
                initiator {
                  id
                }
                time,
                orderDate,
                checkinOrder {
                  description
                }
                pharm {
                  id
                }
              }
            }
        `, () => ({
          id: selected.value
        }))
        refetch()
        const orderEdit = ref(useResult(orderEditResult))

        const fillFields = () => {
          if (orderEdit.value) {
            selectedSN.value = orderEdit.value.serviceNumber
            selectedPharm.value = orderEdit.value.pharm
            orderDate.value = orderEdit.value.orderDate
            const timeSeparated = timeSeparate(orderEdit.value.time)
            timeAt.value = timeSeparated[0]
            timeTo.value = timeSeparated[1]
            description.value = orderEdit.value.checkinOrder.description
          }
        }
        
        watch(orderLoading, (newValueLoading) => {
          fillFields()
        })
        fillFields()

        const createOrder = async () => {
            errors.value = []
            if (!selectedSN.value) {
                errors.value.push('Пользователь не выбран')
            }
            if (!selectedPharm.value) {
                errors.value.push('Аптека не выбрана')
            }
            if (!timeAt.value) {
                errors.value.push('Время от не выбрано')
            }
            if (!timeTo.value) {
                errors.value.push('Время до не выбрано')
            }
            if (!orderDate.value) {
                errors.value.push('Не заполнена дата')
            }
            if (errors.value.length > 0) {
                return
            }
            loading.value = true
            const orderRequest = await ViAxios({
                method: 'post',
                url: selected.value !== 'new' ? '/api/orders/create' : '/api/orders/update',
                body: {  
                    orderId: selected.value,
                    pharm: selectedPharm.value.id,
                    serviceNumber: selectedSN.value.id,
                    time: `${timeAt.value.getHours()}:${timeAt.value.getMinutes()}-${timeTo.value.getHours()}:${timeTo.value.getMinutes()}`,
                    date: orderDate.value,
                    description: description.value
                }
            })
            if (orderRequest.error) {
                await errors.value.push(orderRequest.error.message)
            } else {
                emit('orderSaved')
            }
            loading.value = false
        }

        const currentUser = store.getters.getUserData

        return { loadingSNSelect, snSelect, snLabel,
            pharmsSelect, selectedSN, selectedPharm, 
            orderDate, timeAt, timeTo, loadingPharmSelect,
            description, errors, createOrder, loading, orderEdit,
            orderLoading, currentUser
        }
    },
    computed: {
      modalLoading() {
        return this.orderLoading.value || this.loading.value
      },
      canSave() {
        let canSave = this.selectedId === 'new'
        if (!canSave && this.orderEdit) {
          canSave = this.orderEdit.initiator.id === this.currentUser.id 
        }
        return canSave
      }
    },

})
</script>

<style lang="scss">
    .form-edit {
        &__item {
            margin-bottom: 15px;
        }
    }
    .loader-wrapper {
        text-align: center;
    }
</style>