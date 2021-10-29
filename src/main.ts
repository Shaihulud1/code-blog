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
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Dialog from 'primevue/dialog'
import ProgressSpinner from 'primevue/progressspinner';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Toolbar from 'primevue/toolbar';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Menubar from 'primevue/menubar';
import Badge from 'primevue/badge';
import AutoComplete from 'primevue/autocomplete';
import Menu from 'primevue/menu';
import FullCalendar from 'primevue/fullcalendar';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Tooltip from 'primevue/tooltip';


import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/arya-purple/theme.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(PrimeVue, {
    locale: {
        dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        monthNames: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
        monthNamesShort: ["Ян", "Фев", "Мар", "Апр", "Май", "Июн","Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        today: 'Сегодня',
        weekHeader: 'Вых',
        dateFormat: 'mm.dd.yy',
    }
})
app.use(ToastService)
app.directive('tooltip', Tooltip)


app.component('Toast', Toast)
app.component('Message', Message)
app.component('InputText', InputText)
app.component('Button', Button)
app.component('InputMask', InputMask)
app.component('PanelMenu', PanelMenu)
app.component('Sidebar', Sidebar)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Dialog', Dialog)
app.component('ProgressSpinner', ProgressSpinner)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('Toolbar', Toolbar)
app.component('Dropdown', Dropdown)
app.component('Calendar', Calendar)
app.component('Menubar', Menubar)
app.component('Badge', Badge)
app.component('AutoComplete', AutoComplete)
app.component('Menu', Menu)
app.component('FullCalendar', FullCalendar)

app.mount('#app')
