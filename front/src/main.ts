import {createApp} from 'vue'
import App from './App.vue'
import 'v-calendar/dist/style.css';
import VCalendar from 'v-calendar';
// Use plugin with defaults

const app = createApp(App)

app.use(VCalendar, {})
app.mount('#app')