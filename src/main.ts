import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import pinia from './stores';

import '@/assets/styles/index.scss';
import 'element-plus/dist/index.css';
import 'virtual:svg-icons-register';

// 富文本编辑器样式
import '@wangeditor/editor/dist/css/style.css';

createApp(App).use(router).use(pinia).mount('#app');
