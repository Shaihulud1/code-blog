import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'

import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Message from 'primevue/message'
import Button from 'primevue/button'
import PanelMenu from 'primevue/panelmenu'
import Sidebar from 'primevue/sidebar'

import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
// import 'primeflex/primeflex.css'

import 'primevue/resources/themes/saga-blue/theme.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(PrimeVue)

app.component('Message', Message)
app.component('InputText', InputText)
app.component('Button', Button)
app.component('InputMask', InputMask)
app.component('PanelMenu', PanelMenu)
app.component('Sidebar', Sidebar)

app.mount('#app')
