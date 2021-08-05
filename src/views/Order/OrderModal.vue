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
          <AutoComplete
            v-model="selectedSN"
            :suggestions="searchFilteredVals"
            field="id"
            :dropdown="true"
            @complete="searchServiceNumber($event)"
          >
            <template #item="slotProps">
              <span>{{ slotProps.item.user.fullName }} {{ slotProps.item.id }} ({{ slotProps.item.position }})</span>
            </template>
          </AutoComplete>
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
            date-format="dd.mm.yy"
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

<script lang="ts">
import { defineComponent, ref, watch, Ref, computed } from 'vue'
import gql from 'graphql-tag'
import ViAxios from '@/modules/ViAxios'
import { useQuery, useResult } from '@vue/apollo-composable';
import { timeSeparate, timeJoin, formatDateStr, dateStrToJSDate } from '@/modules/ViHelper/DateHelper'
import store from '@/store'

export default defineComponent ({
    props: {
        selectedId: {
          type: String,
          default: "new"
        },
    },
    emits: ['orderSaved'],
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
      
        const errors: Ref<string[]> = ref([])
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
        const orderEdit = useResult(orderEditResult)

        const fillFields = () => {
          if (orderEdit.value) {
            selectedSN.value = orderEdit.value.serviceNumber.id
            selectedPharm.value = orderEdit.value.pharm.id
            orderDate.value = formatDateStr(orderEdit.value.orderDate)
            const timeSeparated = timeSeparate(orderEdit.value.time)
            timeAt.value = timeSeparated[0]
            timeTo.value = timeSeparated[1]
            description.value = orderEdit.value.checkinOrder.description ?? ""
          }
        }
        
        watch(orderLoading, () => {
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
                url: selected.value === 'new' ? '/api/orders/create' : '/api/orders/update',
                body: {  
                    orderId: selected.value,
                    pharm: selectedPharm.value,
                    serviceNumber: selectedSN.value,
                    time: timeJoin(timeAt.value, timeTo.value),
                    date: typeof(orderDate.value) === 'string' ? dateStrToJSDate(orderDate.value) : orderDate.value,
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

        const searchFilteredVals = ref([]);
        
        const searchServiceNumber = (event: {query: string}) => {
          searchFilteredVals.value = snSelect.value.filter((e: {user: {fullName: string}, id: string, position: string}) => {
            const searchField = `${e.user.fullName} ${e.id} ${e.position}`
            return searchField.includes(event.query)
          })
        }

        const modalLoading = computed(() => orderLoading.value || loading.value)
        const canSave = computed(() => {
            let canSave = props.selectedId === 'new'
            if (!canSave && orderEdit.value) {
              canSave = orderEdit.value.initiator.id === currentUser.id 
            }
            return canSave
        })
        console.log(String)
        return { loadingSNSelect, snSelect, canSave,
            pharmsSelect, selectedSN, selectedPharm, 
            orderDate, timeAt, timeTo, loadingPharmSelect,
            description, errors, createOrder, loading, orderEdit,
            orderLoading, currentUser, searchServiceNumber, searchFilteredVals, modalLoading
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