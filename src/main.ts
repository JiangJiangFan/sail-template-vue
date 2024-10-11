import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import pinia from './stores';

import '@/assets/styles/index.scss';
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn'; // 导入ELement-Plus中文语言包
// import enUs from 'element-plus/es/locale/lang/en';

import { i18n } from './locales/i18n'; // 自定义翻译

import 'virtual:svg-icons-register';

// 富文本编辑器样式
import '@wangeditor/editor/dist/css/style.css';

const app = createApp(App);

app.use(ElementPlus, { locale: zhCn });
app.use(i18n);
app.use(router).use(pinia).mount('#app');
