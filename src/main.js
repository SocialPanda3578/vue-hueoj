//import './assets/main.css'

import { createApp } from 'vue'
import problemApp from './apps/problemApp.vue'
import indexApp from './apps/indexApp.vue'

createApp(indexApp).mount('#app')
createApp(problemApp).mount('#app')