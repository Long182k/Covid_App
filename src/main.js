import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import dayjs from "dayjs";
    const app = createApp(App)
app.config.globalProperties.$dayjs = dayjs
app.use(router)
app.mount('#app')
