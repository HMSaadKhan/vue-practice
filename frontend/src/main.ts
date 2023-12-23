import './style.css'

import { createApp } from 'vue'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import App from './App.vue'
import router from './router'

import '../src/assets/css/tailwind.css'

const app = createApp(App)
app.use(ToastPlugin);

app.use(router)

app.mount('#app')
