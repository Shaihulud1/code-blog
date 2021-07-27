<template>
  <div class="auth-form grid">
    <div class="p-fluid auth-form__wrapper">
      <form
        action=""
        @submit="auth"
      >
        <div class="p-field auth-form__input">
          <label for="phone">Телефон</label>
          <InputMask
            id="phone"
            v-model="phone"
            mask="+7 (999) 999-99-99"
          />
        </div>
        <div class="p-field auth-form__input">
          <label for="lastname">Пароль</label>
          <InputText
            id="lastname"
            v-model="password"
            type="password"
          />
        </div>
        <div class="p-field auth-form__button">
          <Button
            type="submit"
            label="Войти"
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
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import ViAxios from '@/modules/ViAxios'
import { RefreshTokenResponse } from './types'
import router from '@/router'

export default defineComponent({
  setup () {
    const phone: Ref<string> = ref('79000000000')
    const password: Ref<string> = ref('Gj2qPUf')
    const errors: Ref<string[]> = ref([])

    const auth = async (e: Event) => {
      e.preventDefault()
      errors.value = []
      if (phone.value.length === 0) {
        errors.value.push('Пустой телефон')
      }
      if (password.value.length === 0) {
        errors.value.push('Пустой пароль')
      }
      if (errors.value.length === 0) {
        const authRequest = await ViAxios<RefreshTokenResponse>({
          method: 'post',
          url: '/api/internal/auth/login',
          body: { phone: phone.value.replace(/\s|\-|\)|\(|\+/g, ''), password: password.value }
        })
        if (authRequest.error) {
          await errors.value.push(authRequest.error.message)
        } else {
          router.push('/main')
          // console.log(authRequest.response.accessToken)
        }
      }
    }

    return { auth, phone, password, errors }
  }
})

</script>

<style>
.auth-form {
    width: 300px;
    position: absolute;
    left: calc(50% - 150px);
    top: 20%;
}
.auth-form__button {
    margin-top: 10px;
}
</style>
