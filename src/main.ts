import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import pinia from './stores';

import '@/assets/styles/index.scss';
import 'element-plus/dist/index.css';
import 'virtual:svg-icons-register';

createApp(App).use(router).use(pinia).mount('#app');
