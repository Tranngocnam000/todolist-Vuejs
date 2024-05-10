import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'
import 'vue-toastification/dist/index.css';
import Toast from 'vue-toastification';

const app = createApp(App);
app.use(Toast);
app.mount('#app');